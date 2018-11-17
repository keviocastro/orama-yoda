import React from "react";
import { jsonServerRestClient, Admin, Resource, Delete } from "admin-on-rest";
import { SegmentList, SegmentEdit, SegmentCreate } from "./segments";
import { PartnerList, PartnerEdit, PartnerCreate } from "./partners";
import { NotifierList, NotifierCreate, NotifierEdit } from "./notifications";
import addUploadCapabilities from "./addUploadCapabilities";
import portuguesMessages from 'aor-language-portugues';
import { API_URL } from './env';
import SegmentIcon from 'material-ui/svg-icons/action/group-work';
import PartnerIcon from 'material-ui/svg-icons/action/store';
import NotificationsIcon from 'material-ui/svg-icons/alert/add-alert';

const messages = {
  'pt': portuguesMessages,
};
const restClient = jsonServerRestClient(API_URL);
const restCapableClient = addUploadCapabilities(restClient);

const App = () => (
  <Admin restClient={restCapableClient} title="Orama" locale="pt" messages={messages} >
    <Resource
      options={{ label: 'Segmentos' }}
      name="segments"
      list={SegmentList}
      edit={SegmentEdit}
      create={SegmentCreate}
      remove={Delete}
      icon={SegmentIcon}
    />
    <Resource
      options={{ label: 'Parceiros' }}
      name="partners"
      list={PartnerList}
      edit={PartnerEdit}
      create={PartnerCreate}
      remove={Delete}
      icon={PartnerIcon}
    />
    <Resource
      options={{ label: 'Notificações' }}
      name="notifications"
      list={NotifierList}
      edit={NotifierEdit}
      create={NotifierCreate}
      remove={Delete}
      icon={NotificationsIcon}
    />
  </Admin>
);

export default App;
