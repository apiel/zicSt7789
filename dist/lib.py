#!/usr/bin/env python

from PIL import Image, ImageDraw, ImageFont
from ST7789 import ST7789

SPI_SPEED_MHZ = 80

image = None
draw: ImageDraw = None
st7789 = None

def init_display(width, height):
    global image
    global draw
    global st7789
    image = Image.new("RGB", (width, height), (0, 0, 0))
    draw = ImageDraw.Draw(image)

    st7789 = ST7789(
        rotation=90,  # Needed to display the right way up on Pirate Audio
        port=0,       # SPI port
        cs=1,         # SPI port Chip-select channel
        dc=9,         # BCM pin used for data/command
        backlight=13,
        spi_speed_hz=SPI_SPEED_MHZ * 1000 * 1000
    )

def render():
    st7789.display(image)

def draw_rect(xy, fill=None, outline=None, width=1):
    draw.rectangle(xy, (fill if fill == None else tuple(fill)), (outline if outline == None else tuple(outline)), width)

def draw_text(xy, text, fill=None, fontPath=None, size=None):
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf" if fontPath == None else fontPath, size if size != None else 16) 
    return draw.text(xy, text, ((255, 255, 255) if fill == None else tuple(fill)), font)

def draw_line(xy, fill=None, width=0, joint=None):
    draw.line(xy, (fill if fill == None else tuple(fill)), width, joint)

def draw_point(xy, fill=None):
    draw.point(xy, (fill if fill == None else tuple(fill)))
