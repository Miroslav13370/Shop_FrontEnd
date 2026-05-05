export interface IStore {
  id: string;
  title: string;
  description?: string | null;
}

export type IStoreCreate = Pick<IStore, 'title'>;

export type IStoreEdit = Pick<IStore, 'title' | 'description'>;
