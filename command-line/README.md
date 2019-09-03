# Command Line

`sudo su` elevate to sudo user permanently (without password)

`du -skh *` check the size of files and folders in the current directory

`sed -i -e 's/"Amazon"/"Postgres"/g' appsettings.json` * find and replace a value in a file

`dpkg -l libgdiplus` * check if the libgdiplus is installed on the server

`host myip.opendns.com resolver1.opendns.com` *displays your public ip address*

`sed -i 's/ugly/beautiful/g' /home/bruno/old-friends/sue.txt`

`find . -name *.orig -exec rm {} \; -o -name *DS_Store* -exec rm {} \;`

`rename 's/\.png$/.jpg/' *.png`	*rename all .png to .jpg*

`rename 's/^/avatar_/' *.png`	*append 'avatar_' to all .png files*

`ls ~someuser/`	*Shortcut to the home directory of someuser*

`ls /etc/*a.*` 	*Finds all files in /etc/ with a follwoed by*

`find . -name '*.xml'` *Will find all xml files recursive under the cd*

`find ~ -name development.log` 	*Find all files with name development.log under the home(~)*

`find ~ -name '*.txt' -perm 644` *Finds all .txt files with permission 644*

`find ~ -mtime 0`	*Finds all files modified in the last 24 hours (0 = 24hrs, 1 = 48hrs, 2 = 72hrs)*

`find ~ -atime 0`	*Finds all files accessed in the last 24 hours (0 = 24hrs, 1 = 48hrs, 2 = 72hrs)*

`find workspace -amin 1` *Finds all files accessed in the last 1 minute (can also use: amin, cmin, mmin)*

`find workspace -name dadou -exec rm '{}' \;`	*Finds and deletes all found (test the find on it's own first!)*

`find workspace -name CVS -type d -exec rm -r '{}' \;` *Finds and recursive deletes all CVS folders under workspace*

`find / -user darren`	*Finds all files by darren*

`find / -user darren –exec grep root {} \;` *Finds all files by darren that contain the word "root" (note the use of -exec and "\;" at the end)*

`find ~/workspace -type f -empty` *Find all empty files*

`find ~/workspace -type d -empty` *Find all empty folders*

`tac` *'cat' command in reverse! It dumps content of file in reverse*

`tail` 	*shows the last 10 lines of a file*

`tail -40 /etc/sometime.txt` *Dumps last 40 lines of sometime.txt*

`tail –f`	*shows the last lines of a file and adds to the output as the file grows*

`grep -r dadou ./workspace/*` *Find everything in the workspace that contains the word dadou in the file*

`ls -l > list_of_files.txt` *Redirects the output to a file*

`ls -l >> list_of_files.txt` *Redirects the output to a file (and appends the contents >>)*

`cp -r /var/lib/ejabberd/ workspace/backup/` *Copy a folder from one location to another (note -r)*

`ln -s jruby-1.4.0/ jruby` *creates a simlink to the install folder for JRuby*

`ln -s /path/to/original /path/to/link` *a better example of creating a symlink*

`ln -s "/path/to/the original" /path/to/link` *example of creating a symlink if there are spaces in the directory (basically surround with quotes)*

`chmod a+wr /some/file` * enables /some/file to be read(r) and write(w) by all(a)

`chmod u+rw /some/file` * enables /some/file to be read(r) and write(w) by the owner(u)