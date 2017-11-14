import React from "react";
import { jsonServerRestClient, Admin, Resource, Delete } from "admin-on-rest";
import { SegmentList, SegmentEdit, SegmentCreate } from "./segments";
import { PartnerList, PartnerEdit, PartnerCreate } from "./partners";
import addUploadCapabilities from "./addUploadCapabilities";

const restClient = jsonServerRestClient("http://orama.origamisapp.com");
const restCapableClient = addUploadCapabilities(restClient);

const App = () => (
  <Admin restClient={restCapableClient} title="Orama yoda">
    <Resource
      name="segments"
      list={SegmentList}
      edit={SegmentEdit}
      create={SegmentCreate}
      remove={Delete}
    />
    <Resource
      name="partners"
      list={PartnerList}
      edit={PartnerEdit}
      create={PartnerCreate}
      remove={Delete}
    />
  </Admin>
);

export default App;
