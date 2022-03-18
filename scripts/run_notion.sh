test -t 1 && USE_TTY="-t" 
docker run --rm "${USE_TTY}" -v "$PWD":/workspace blog-notion