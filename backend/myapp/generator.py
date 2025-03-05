import torch
import torch.nn as nn
import torch.nn.functional as F


class SelfAttention(nn.Module):
    def __init__(self, in_dim):
        super(SelfAttention, self).__init__()
        self.query = nn.Conv2d(in_dim, in_dim // 8, 1)
        self.key = nn.Conv2d(in_dim, in_dim // 8, 1)
        self.value = nn.Conv2d(in_dim, in_dim, 1)
        self.gamma = nn.Parameter(torch.zeros(1))

    def forward(self, x):
        batch_size, C, width, height = x.size()
        query = self.query(x).view(batch_size, -1, width * height).permute(0, 2, 1)
        key = self.key(x).view(batch_size, -1, width * height)
        energy = torch.bmm(query, key)
        attention = F.softmax(energy, dim=-1)
        value = self.value(x).view(batch_size, -1, width * height)

        out = torch.bmm(value, attention.permute(0, 2, 1))
        out = out.view(batch_size, C, width, height)
        out = self.gamma * out + x
        return out


class Generator(nn.Module):
    def __init__(self, nz=256, num_classes=5, img_channels=3, ng=64):
        super(Generator, self).__init__()
        self.label_embedding = nn.Embedding(num_classes, nz)

        self.model = nn.Sequential(
            self._block(nz * 2, ng * 16, 4, 1, 0),
            self._block(ng * 16, ng * 8),
            self._block(ng * 8, ng * 4),
            self._block(ng * 4, ng * 2),
            SelfAttention(ng * 2),
            self._block(ng * 2, ng),
            self._block(ng, ng // 2),
            nn.utils.spectral_norm(nn.ConvTranspose2d(ng // 2, 3, 4, 2, 1, bias=False)),
            nn.Tanh(),
        )

    def _block(self, in_channels, out_channels, kernel_size=4, stride=2, padding=1):
        return nn.Sequential(
            nn.utils.spectral_norm(
                nn.ConvTranspose2d(
                    in_channels, out_channels, kernel_size, stride, padding, bias=False
                )
            ),
            nn.BatchNorm2d(out_channels),
            nn.SiLU(),
        )

    def forward(self, noise, labels):
        x = (
            torch.cat([noise, self.label_embedding(labels)], dim=1)
            .unsqueeze(-1)
            .unsqueeze(-1)
        )
        return self.model(x)
