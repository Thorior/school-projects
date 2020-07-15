************  The folder containing the Database is USER-DB **********

doing things from windows to start the database these are the commands I use.

to path to the mongo install location:

>     cd C:\program files\MongoDB\server\4.2\bin

then to start the database:

>	 mongod -dbpath C:\Users\thor5\desktop\CS216\USER-DB

after that I open a new CMD shell and use the same command as above to path to the install location:

>	cd C:\program files\MongoDB\server\4.2\bin

and then the enter the commands:

>	mongo

>	show dbs

>	use userIdeas_db

	I've included the js files cs216ideas,cs216names, and cs216users, as a way of quickly loading the begining 
information that the database was to contain at the start of the semester.

	I had done this as a way of quickly updating the database at school since i was having trouble with the information
copying over to the school computers.