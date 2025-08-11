export class CreateAuthDto {
  id: string;
  providerIdentities?: string[]; // IDs des ProviderIdentity
}