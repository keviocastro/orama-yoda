import React from "react";
import { Admin, Resource, Delete } from "admin-on-rest";
import { SegmentList, SegmentEdit, SegmentCreate } from "./segments";
import { PartnerList, PartnerEdit, PartnerCreate } from "./partners";
import { NotifierList, NotifierCreate, NotifierEdit } from "./notifications";
import addUploadCapabilities from "./addUploadCapabilities";
import portuguesMessages from 'aor-language-portugues';
import SegmentIcon from 'material-ui/svg-icons/action/group-work';
import PartnerIcon from 'material-ui/svg-icons/action/store';
import NotificationsIcon from 'material-ui/svg-icons/alert/add-alert';
import { RestClient } from 'aor-firestore-client';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC5GVAD8hkLMttaR3eTK_fjNI0DQHLltnA',
  authDomain: 'o-rama2.firebaseapp.com',
  databaseURL: 'https://o-rama2.firebaseio.com',
  projectId: 'o-rama2',
  storageBucket: 'o-rama2.appspot.com',
  messagingSenderId: '616321582414'
};

const restClientOptions = {
  getItemID: (entry) => {
    let id;
    if (entry.data.name)
      id = entry.data.name;

    if (entry.data.title)
      id = entry.data.title;

    return id.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g, '');
  },
  trackedResources: [
    {
      name: "segments",
      isPublic: true,
    },
    {
      name: "partners",
      isPublic: true
    }
  ],
  options: {
    timestampFieldNames: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    },
    firebasePersistence: firebase.auth.Auth.Persistence.SESSION,
  }
};

const messages = {
  'pt': portuguesMessages,
};

const restClient = RestClient(firebaseConfig, restClientOptions)
addUploadCapabilities(restClient);

const App = () => (
  <Admin restClient={restClient}
    title="O-rama"
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
  </Admin >
);

export default App;
