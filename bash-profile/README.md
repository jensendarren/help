# Bash Profile

```
export EDITOR=nano
export KOPS_STATE_STORE=s3://kops-state-rt7665

 # This loads nvm
export NVM_DIR="/Users/darren/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# added by Anaconda3 5.2.0 installer
export PATH="/anaconda3/bin:$PATH"

# This loads rbenv
eval "$(rbenv init -)"

# For activating a python environment
alias venv="source venv/bin/activate"
# Flush the network
alias fl="networksetup -setairportpower en0 off; sudo route flush; networksetup -setairportpower en0 on;"
# Rails alias
alias rs="bundle exec rails s"
alias rc="bundle exec rails c"
# Git alias
alias gs='git status '
alias ga='git add '
alias gb='git branch '
alias gc='git commit'
alias gd='git diff'
alias go='git checkout '
# Docker alias
alias ks='kubectl'
alias dc='docker-compose'
alias dp='docker ps'
alias di='docker images'
# Working directory alias
alias wk='cd ~/workspace/'
alias wkh='cd ~/workspace/help/'
# Docker helper functions
dexec() { docker exec -it "$1" bash; }
drun() { docker run -it --entrypoint bash -v "$PWD":"$1" "$2"; }
dclean() { docker stop $(docker ps -a -q); docker rm -f $(docker ps -a -q); docker rmi -f $(docker images | grep "<none>" | awk "{print \$3}"); docker system prune -f; docker system prune --volumes -f; }
# Local help file managment
alias eh='cd ~/workspace/help; code .'
ch() { cd ~/workspace/help/; git add .; git commit -m 'Update help'; git push origin master; }
```

## zsh (z shell) config

Calling 'nvm use' automatically in a directory with a .nvmrc file. Answer from [SO here](https://stackoverflow.com/questions/23556330/run-nvm-use-automatically-every-time-theres-a-nvmrc-file-on-the-directory).

Put this into your `$HOME/.zshrc` to call nvm use automatically whenever you enter a directory that contains an .nvmrc file with a string telling nvm which node to use:

```
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```