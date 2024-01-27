
export class UserApiRequest
{

  public Id : Number = 0;
  public firstname : string = "";
  public lastname : string = "";
  public username : string = "";
  public token : string = "";
  public email : string = "";
  public Role  : string = "";
  public password : string = "";

  public constructor(
    fields?: {
        Id? : Number,
        firstname? : string,
        lastname? : string,
        username : string,
        token : string,
        email? : string,
        Role?  : string,
        password : string
    })
    {
      if (fields) {
        this.Id = fields.Id || this.Id;
        this.firstname = fields.firstname || this.firstname;
        this.lastname = fields.lastname || this.lastname;
        this.username = fields.username || this.username;
        this.token = fields.token || this.token;
        this.email = fields.email || this.email;
        this.Role = fields.Role || this.Role;
        this.password = fields.password || this.password;
      }
    }



}
