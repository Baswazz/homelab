# Scripts

## How-to

1. Open your shell's configuration file (`~/.bashrc` for bash or `~/.zshrc` for zsh) using a text editor.
2. Add the following at the end of the file.
3. Save the file and close the text editor.
4. Reload the shell configuration by running the command `source ~/.bashrc` for bash or `source ~/.zshrc` for zsh.

## unzip-all

Run the `unzip-all` command in your shell to extract all the ZIP files within the current directory and place the extracted files in separate folders based on the ZIP file names.

```bash
unzip-all() {
  find . -maxdepth 1 -name "*.zip" -exec sh -c 'unzip -d "${1%.*}" "$1"' _ {} \;
}
```

Run the `unrar-all` command in your shell to extract all the RAR files within the current directory and place the extracted files in separate folders based on the RAR file names.

```bash
unrar-all() {
  # find . -maxdepth 1 -name "*.rar" -exec sh -c 'mkdir -p "${1%.*}" && 7z e -o"${1%.*}" "$1"' _ {} \;
    find . -maxdepth 1 -name "*.rar" -exec sh -c 'if [[ $(basename "$1") =~ \.part[0-9]+\.rar$ ]]; then 7z e "$1"; else mkdir -p "${1%.*}" && 7z e -o"${1%.*}" "$1"; fi' _ {} \;
}
```

## wget-rmq (remove querystring)

Run the `wget-rmq http://www.example.com/index.html?querystring` this allows to download files and remove the querystring from the filename.

```bash
wget-rmq ()
{
  [ -z "$1" ] && echo 'error: wget-rmq requires a URL to retrieve as the first arg'
  local output_filename="$(echo $1 | sed 's/?.*//g' | sed 's|https.*/||g')"
  wget -O "${output_filename}" "${1}"
}
```

[source](https://stackoverflow.com/a/66297444)
