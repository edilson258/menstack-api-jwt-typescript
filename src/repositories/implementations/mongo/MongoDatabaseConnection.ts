import mongoose from "mongoose";

export default class MongoDatabaseConnection {
  private connection: mongoose.Connection | null = null;

  connect() {
    if (!this.connection) {
      mongoose.connect("mongodb://127.0.0.1:27017/menstack");
      this.connection = mongoose.connection;
    }

    this.connection?.on(
      "error",
      console.error.bind(console, "Mongo Database connection error:")
    );
    this.connection?.once("open", function () {
      console.log("Mongo Database connected");
    });
  }
}
