import { ClassType } from 'type-graphql';

import { ProductResolver } from './product-resolver'

type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]];

const resolvers: NonEmptyArray<ClassType> = [ ProductResolver];

export default resolvers;
