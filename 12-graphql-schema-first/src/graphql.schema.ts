
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PostInput {
    id?: number;
    name?: string;
}

export class CreateCatInput {
    name?: string;
    age?: number;
}

export abstract class IQuery {
    abstract authors(): Author[] | Promise<Author[]>;

    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;
}

export class Author {
    id?: number;
    name?: string;
    age?: number;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;

    abstract upvotePost(post?: PostInput): Post | Promise<Post>;
}

export class Post {
    id?: number;
    name?: string;
}

export abstract class ISubscription {
    abstract catCreated(): Cat | Promise<Cat>;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}
