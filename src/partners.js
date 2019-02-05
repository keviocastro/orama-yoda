import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  Edit,
  DisabledInput,
  ImageInput,
  ImageField,
  ReferenceArrayField,
  ReferenceArrayInput,
  SelectArrayInput,
  SingleFieldList,
  ChipField,
  TextInput,
  SimpleForm,
  Create,
  Filter,
  NumberInput,
  BooleanInput,
  BooleanField,
  LongTextInput
} from "admin-on-rest";

export const PartnerList = props => (
  <List {...props} title='Parceiros' filters={<PartnerFilter />} >
    <Datagrid>
      <NumberField source="id" label='ID Orama' />
      <NumberField source="priority" label='Prioridade' />
      <BooleanField source="highlighted" label="Destaque" />
      <NumberField source="notification_credits" label='Créditos' />
      <ImageField source="logo" label='Logo' />
      <TextField source="name" label='Nome da empresa' />
      <TextField source="subtitle" label='Slogan' />
      <ReferenceArrayField
        label="Segmentos de atuação"
        reference="segments"
        source="segmentIds"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <EditButton />
    </Datagrid>
  </List>
);

export const PartnerEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" label='ID Orama' />
      <ReferenceArrayInput
        label="Segmentos de atuação"
        source="segmentIds"
        reference="segments"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <TextInput source="fb_id" label='ID do facebook' />
      <TextInput source="fb_user_name" label='Usuário do facebook' />
      <TextInput source="name" label='Nome da empresa' />
      <NumberInput source="priority" label='Prioridade de exibição' />
      <BooleanInput source="highlighted" label='Exibir em destaque' />
      <ImageInput source="highlight_image" label="Imagem de destaque" accept="image/*">
        <ImageField source="highlight_image" title="Imagem de destaque" />
      </ImageInput>
      <TextInput source="highlight_message" label='Mensagem em destaque' />
      <NumberInput source="notification_credits" label='Créditos de notificação' />
      <TextInput source="subtitle" label='Slogan' />
      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="logo" title="name" />
      </ImageInput>
      <ImageInput source="feed_image" label="Imagem principal do feed" accept="image/*">
        <ImageField source="feed_image" title="name" />
      </ImageInput>
      <LongTextInput source="welcome_messages" label='Mensagens de boas vindas do chat' />
    </SimpleForm>
  </Edit>
);

export const PartnerCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <ReferenceArrayInput
        label="Segmentos de atuação"
        source="segmentIds"
        reference="segments"
        allowEmpty
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <TextInput source="fb_id" label='ID do facebook' />
      <TextInput source="fb_user_name" label='Usuário do facebook' />
      <TextInput source="name" label='Nome' />
      <NumberInput source="priority" label='Prioridade de exibição' />
      <BooleanInput source="highlighted" label="Exibir em destaque" />
      <ImageInput source="highlight_image" label="Imagem de destaque" accept="image/*">
        <ImageField source="highlight_image" title="Imagem de destaque" />
      </ImageInput>
      <TextInput source="highlight_message" label='Mensagem em destaque' />
      <NumberInput source="notification_credits" label='Créditos de notificação' />
      <TextInput source="subtitle" label='Slogan' />
      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="logo" title="name" />
      </ImageInput>
      <ImageInput source="feed_image" label="Imagem principal do feed" accept="image/*">
        <ImageField source="feed_image" title="name" />
      </ImageInput>
      <LongTextInput source="welcome_messages" label='Mensagens de boas vindas do chat' />
    </SimpleForm>
  </Create>
);

const PartnerFilter = props => (
  <Filter {...props}>
    <ReferenceArrayInput
      label="Segmentos de atuação"
      source="segmentIds"
      reference="segments"
      allowEmpty
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
    <BooleanInput source="highlighted" label="Destaques" />
    <NumberInput source="notification_credits" label="Créditos" />
  </Filter>
);