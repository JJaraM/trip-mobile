import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Storage, LocalStorage, SqlStorage} from 'ionic-framework/ionic';

@Injectable()
export class UserFactory {

  constructor() {
    this.db = new Storage(SqlStorage, {name: 'thadatabase'});
  }

  storeInSession(id, email, name) {
    this.db.query('drop table session');
    this.db.query('create table session (id text PRIMARY KEY, email text, name text)');
    this.db.query("insert into session values ('"+id+"','" + email +"','" + name + "')");
  }

  findUserInSession() {
    return this.db.query("select * from session");
  }

  findUserByEmailAndId() {
    this.db.query("select * from profile where id='"+ data.id +"'and email='"+data.email + "'").then((resultSet) => {
        console.log(resultSet.res.rows[0]);
    }, (err) => {
        console.log('Error: ', err);
    });
  }

}
