## Git

Change the **global** username for commits made by default on all repos:

```
git config --global user.name "Darren Jensen"
git config --global user.email "darren.jensen@gmail.com"
git config credential.username 'jensendarren'
```

Change the **local** username for commits made in a _specific_ repo:

```
git config user.name "Darren Jensen Contractor"
git config user.email "darren.jensen@acontractor.com"
```
### Git diff

If you have just made a commit, or want to see what has changed in the last commit compared to the current state use the following command. This will compare the HEAD with the commit immediately prior:

```
git diff HEAD^
```

To compare to the state of play 2 commits ago use:

```
git diff HEAD^^
```

Easiest way to see what was committed at a specific individual commit is to use the `git show` command liks so:

```
git show 6d0e09c
```

This will show you exactly what you commited at commit sha `6d0e09c` :)

Above from [this SO question](https://stackoverflow.com/questions/17244471/see-diff-between-current-state-and-last-commit/17244494).

To compare the diff between two *specific* commits

```
# Between 4ac0a673 and 5688b75
git diff 5688b75..4ac0a673

# Between working copy and 5688b75 (but **not including** 5688b75) so its likea diff from the commit *after* the one specified to HEAD (working copy)
git diff 5688b75
```

Show a specific file at a particular commit

```
git show 000a7a9a path/to/the/file.txt
```

Show a list of files changed in a specific commit using git show with the --name-only flag:

```
git show 000a7a9a --name-only
```

Replace that version of the file in your wd

```
git checkout 000a7a9a path/to/the/file.txt
```

### Fix issue with connecting to Github over SSH on port 443

Maybe Github will stop working with `ssh: connect to host github.com port 22: Operation timed out. fatal: Could not read from remote repository.`.

To fix this you need to enable SSH config to work over HTTPS, as explained in [this post](https://www.ionicframeworks.com/2020/02/connect-to-host-githubcom-port-22.html).

Basically, to test run this command `ssh -T git@github.com`. If it times out or has an errro then add the following to your `~/.ssh/config` file:

```
Host github.com
   HostName ssh.github.com
   Port 443
```

Now run the `ssh -T git@github.com` again and you should see:

```
Hi jensendarren! You've successfully authenticated, but GitHub does not provide shell access.
```

### Sort branches by latest commit timestamps

Lets say you need to find out which branch has the laest code. Run the following using `git`.

```
git branch -a --sort=committerdate
```

### Pushing to multiple git repos

Taken from [this gist](https://gist.github.com/rvl/c3f156e117e22a25f242)

Start by cloning the test repo!!

`git clone git@bitbucket.org:darren_jensen/hurdey-gurdey.git`

Setup remotes (the **origin** remote probably points to one of these URLs):

```
# Just set one additional remote since we can assume the remote origin is already set to git@bitbucket.org:darren_jensen/hurdey-gurdey.git since that is where we cloned from

git remote add rotati git@github.com:rotati/hurdey-gurdey.git
```

Setup remote push URLs

```
git remote set-url --add --push origin git@bitbucket.org:darren_jensen/hurdey-gurdey.git
git remote set-url --add --push origin git@github.com:rotati/hurdey-gurdey.git
```

Set the default checkout default remote to origin:

```
git config --add checkout.defaultRemote origin
```

Check the config

```
git remote show origin
cat .git/config
```

So now all pushes will push to both remote repositories (no changes to the workflow here):

```
git push origin master
```

For pulling in work is slightly different in order to fetch changes from both remote repos. In order to do that:

```
git fetch --all
git merge --squash github/next_release bb/next_release
```

Process is:

```
git checkout develop
git pull origin develop
git checkout -b some_new_branch
git fetch --all
git branch -a
git checkout rotati/167337886_blah <-- now in detached HEAD
git merge some_new_branch <-- effectivly merging in develop HEAD
git checkout some_new_branch
git merge --squash rotati/167337886_blah
# Do work then commit....
```

### Deleting a local and remote commit

```
# Find the commit SHA you wish to remove from the current branch logs
git log --pretty=oneline --abbrev-commit

# Open the rebase tool to show the last N commits (here 2)
git rebase -i HEAD~2

# In the text editor that opens, remove the commit line from the file
# In my case the file opens in nano so I just remove the like using CTRL+K and then exit from nano

# Check the log again and you should see the commit is gone!
git log --pretty=oneline --abbrev-commit

# Finally, you must to a forced push to update the changes to the remote branch (note the + before the branch name means to force the changes)
git push origin +branch_name
```

### Deleting local and remote branches

```
# To delete a local branch
git branch -d branch_name

# To delete a remote branch
git push <remote_name> -d <branch_name>
```

### Rename a branch

```
# Checkout the branch to rename and then rename it like so
git branch -m updated-branch-name

# Now simply push this branch to the remote and then delete the old named branch from remove using the command mentioned above.
```

### Overwrite a branch

To completely overwrite an existing branch with another branch without promting any merge conflcts you can issue the following command. Assumes you want overwrite `master` branch with `branch_to_completely_overwrite_master` branch:

```
git checkout master

git reset --hard origin/branch_to_completely_overwrite_master

git push --force
```

## Fork a Github repo to Gitlab

1. Create the empty repo in Gitlab
1. Clone and add an upstream remote with `git remote add upstream https://github.com/user/repo`
1. Now pull the upstream master `git pull upstream master`
1. Now push to the Gitlab (origin) master `git push origin master`

Above from [this SO question](https://stackoverflow.com/questions/50973048/forking-git-repository-from-github-to-gitlab).

## Get git commit hash

A git commit has a 40 character identifier that is usually referred to as the "SHA" or "hash". This is how you display the hash in your terminal.

```
git rev-parse HEAD
git rev-parse --short HEAD
```