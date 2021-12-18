db.createUser(
        {
            user: "genericuser",
            pwd: "somePassword",
            roles: [
                {
                    role: "dbOwner",
                    db: "test"
                }
            ]
        })