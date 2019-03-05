import React from "react";
import { Admin, Resource, Delete } from "admin-on-rest";
import { SegmentList, SegmentEdit, SegmentCreate } from "./segments";
import { PartnerList, PartnerEdit, PartnerCreate } from "./partners";
import { NotifierList, NotifierCreate, NotifierEdit } from "./notifications";
import portuguesMessages from 'aor-language-portugues';
import SegmentIcon from 'material-ui/svg-icons/action/group-work';
import PartnerIcon from 'material-ui/svg-icons/action/store';
import NotificationsIcon from 'material-ui/svg-icons/alert/add-alert';
import RestClient from "./firestore";

const messages = {
  'pt': portuguesMessages,
};

//const restCapableClient = addUploadCapabilities(RestClient);

const App = () => (
  <Admin
    restClient={RestClient(RestClient)}
    title="Orama"
    locale="pt"
    messages={messages} >
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
