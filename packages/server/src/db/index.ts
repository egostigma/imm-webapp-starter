import mongoose from "mongoose";

export interface DBOpts {
  user: string | undefined;
  password: string | undefined;
  hostname: string | undefined;
  port: string | undefined;
  db: string | undefined;
}

export const startDB = ({ user, password, hostname, port, db }: DBOpts) => {
  const isAuthEnabled = user && password;
  const mongoAuth = isAuthEnabled ? `${user}:${password}@` : "";

  const mongoURI = `mongodb://${mongoAuth}${hostname}:${port}/${db}`;


  return mongoose
    .connect(mongoURI, {
      promiseLibrary: require("bluebird"),
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch(err => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
    });
};
