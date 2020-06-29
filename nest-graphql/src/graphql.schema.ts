
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract login(client_id?: string, client_secret?: string): Authorization | Promise<Authorization>;
}

export class Authorization {
    access_token: string;
}
