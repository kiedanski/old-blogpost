test -t 1 && USE_TTY="-t" 
docker run --rm "${USE_TTY}" --env-file ./.env -v "$PWD":/workspace blog-notion