# %%
from pathlib import Path
from pickletools import optimize
from statistics import quantiles
from PIL import Image
import urllib.request
import shutil
import re
import tempfile


# %%

markup_image = "\!\[.*\]\((.*)?\)"
cover_image = "\nimage:\s(.*)\n"

img_re = re.compile(markup_image)
img2_re = re.compile(cover_image)


def extract_images(body):
    img_1 = img_re.findall(body)
    img_2 = img2_re.findall(body)

    return img_1 + img_2


def download_image_to_assets(img_url):

    if "http" in img_url:
        local_filename, headers = urllib.request.urlretrieve(img_url)

        img_ext = "." + headers.get_content_type().split("/")[1]
        tmp_path = Path(local_filename)

        new_path = tempfile.mkstemp(
            suffix=img_ext, prefix=None, dir=assets_path, text=False
        )[1]

        # tmp_path.rename(new_path)
        shutil.copy(str(tmp_path), str(new_path))

        img = Image.open(new_path)
        img.save(new_path, optimize=True, quality="web_low")

        new_path_str = "/" + str(Path(*Path(new_path).parts[-3:]))
        return new_path_str


assets_path = Path("assets/images")
shutil.rmtree(assets_path, ignore_errors=True)
assets_path.mkdir(parents=True, exist_ok=True)

files = list(Path("_posts").rglob("*.md")) + ["index.md", "about.md"]
for fl in files:
    if "README" not in str(fl):
        print(fl)
        with open(fl, "r") as fh:
            content = fh.read()

            images = img_re.findall(content)
            images.extend(img2_re.findall(content))

            for i, img in enumerate(images):

                new_path = download_image_to_assets(img)
                content = content.replace(img, new_path)

            with open(fl, "w") as fh:
                fh.write(content)
