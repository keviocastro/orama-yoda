import React from "react";
import { jsonServerRestClient, Admin, Resource, Delete } from "admin-on-rest";
import { SegmentList, SegmentEdit, SegmentCreate } from "./segments";
import { PartnerList, PartnerEdit, PartnerCreate } from "./partners";
import addUploadCapabilities from "./addUploadCapabilities";
import portuguesMessages from 'aor-language-portugues';
import { API_URL } from './env';

const messages = {
  'pt': portuguesMessages,
};
const restClient = jsonServerRestClient(API_URL);
const restCapableClient = addUploadCapabilities(restClient);

const App = () => (
  <Admin restClient={restCapableClient} title="Gestor orama" locale="pt" messages={messages} >
    <Resource
      options={{ label: 'Segmentos' }}
      name="segments"
      list={SegmentList}
      edit={SegmentEdit}
      create={SegmentCreate}
      remove={Delete}
    />
    <Resource
      options={{ label: 'Parceiros' }}
      name="partners"
      list={PartnerList}
      edit={PartnerEdit}
      create={PartnerCreate}
      remove={Delete}
    />
  </Admin>
);

export default App;
