## Initialize database

### At first, please execute command as follow:
```
gradle flywayMigrate
```

### If you want to test locally, please execute this command to initialize default data at the first time:

```
gradle initDefaultData
# this command will create admin user with ROLE_ADMIN as default user, you could remove it from database if you do not need it.
```