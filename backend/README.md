# devclasses (backend 🤓 )

This backend is a REST API that has the following routes:

- `GET` /modules
- `POST` /modules
- `PUT` /modules
- `DELETE` /modules
- `GET` /classes
- `POST` /classes
- `PUT` /classes
- `DELETE` /classes
- `GET` /user_admin
- `POST` /user_admin

They have the functions of listing, registering, updating, and deleting modules and classes, in the method of listing modules it can be passed either with the module `id` or without anything, when the module `id` is passed it returns only the respective module to the `id`.
Each one of these methods will contact the database and make changes or just fetch data.

If for any reason you want to run your web application on a port other than 3000, I need to change the code below which is located at: `index.js`

```js
app.use(cors({
  origin: 'http://localhost:3000'
}))
```

## Config Firebase

If you don't have a firebase account yet, create one and start a new project with the name of the application or whatever. After the project has been created select `Firestore Database` from the side menu and start the service.
Access the [google cloud platform console](https://console.cloud.google.com/apis/credentials), select the project you just created and click on `APIs and services > Credentials`, create the OAuth client IDs, and download the `json` file to your project root, it should look like thereby:

```json
{
  "type": "service_account",
  "project_id": "example_project_id",
  "private_key_id": "example_project_key",
  "private_key": "example_project_private_key",
  "client_email": "example_project_client_email",
  "client_id": "example_client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/project-name-20aef%40appspot.gserviceaccount.com"
}
```

Then just start using 👨‍💻 👩‍💻