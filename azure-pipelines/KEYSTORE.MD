# HOW TO GENERATE KEYSTORE

<https://stackoverflow.com/questions/3997748/how-can-i-create-a-keystore>

I was crazy looking how to generate a .keystore using in the shell a single line command, so I could run it from another application. This is the way:

```cmd
echo y | keytool -genkeypair -dname "cn=My Fertility Health, ou=Software, o=My Fertility Health, c=US" -alias business -keypass averystrongpassword -keystore android.keystore -storepass evenstrongerpassword -validity 20000
```

* __dname__ is a unique identifier for the application in the .keystore

* __cn__ the full name of the person or organization that generates the .keystore

* __ou__ Organizational Unit that creates the project, its a subdivision of the Organization that creates it. Ex. android.google.com

* __o__ Organization owner of the whole project. Its a higher scope than ou. Ex.: google.com

* __c__ The country short code. Ex: For United States is "US"
alias Identifier of the app as an single entity inside the .keystore (it can have many)

* __keypass__ Password for protecting that specific alias.
keystore Path where the .keystore file shall be created (the standard extension is actually .ks)

* __storepass__ Password for protecting the whole .keystore content.

* __validity__ Amout of days the app will be valid with this .keystore

It worked really well for me, it doesnt ask for anything else in the console, just creates the file. For more information see keytool - Key and Certificate Management Tool.
