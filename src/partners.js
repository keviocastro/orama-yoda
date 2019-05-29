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
  LongTextInput,
  Responsive,
  SimpleList
} from "admin-on-rest";

export const PartnerList = props => (
  <List {...props} title='Parceiros' filters={<PartnerFilter />} sort={{ field: 'name', order: 'ASC' }} >
    <Responsive
      small={
        <SimpleList
          primaryText={partner => partner.name}
          secondaryText={partner => partner.segments_name}
          tertiaryText={partner => {
            let credits = partner.notification_credits ? partner.notification_credits : 0
            return `${credits}`
          }}
        />
      }
      medium={
        <Datagrid>
          <NumberField source="id" label='ID Orama' />
          <NumberField source="priority" label='Prioridade' />
          <BooleanField source="highlighted" label="Destaque" />
          <NumberField source="notification_credits" label='Créditos' />
          <ImageField source="logo" label='Logo' />
          <TextField source="name" label='Nome da empresa' />
          <TextField source="subtitle" label='Slogan' />
          <ReferenceArrayField
            sortable={false}
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
      }
    />
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
      <TextInput source="name" label='Nome da empresa' />
      <TextInput source="subtitle" label='Slogan' />
      <TextInput source="pass" label='Senha' />
      <LongTextInput source="welcome_messages" label='Mensagens de boas vindas do chat' />
      <NumberInput source="priority" label='Prioridade de exibição' />
      <BooleanInput source="highlighted" label='Exibir em destaque' />
      <NumberInput source="notification_credits" label='Créditos de notificação' />

      <ImageInput source="highlight_image" label="Imagem de destaque" accept="image/*">
        <ImageField source="highlight_image" title="Imagem atual" />
      </ImageInput>
      <ImageField source="highlight_image" title="Imagem atual" />

      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="logo" title="name" />
      </ImageInput>
      <ImageField source="logo" title="Imagem atual" />

      <ImageInput source="feed_image" label="Imagem principal do feed" accept="image/*">
        <ImageField source="feed_image" title="name" />
      </ImageInput>
      <ImageField source="feed_image" title="Imagem atual" />

      <ImageInput source="last_post" title="Ultimo post" label="Imagem do post" >
        <ImageField source="feed_image" title="Ultimo post" />
      </ImageInput>
      <ImageField source="last_post" title="Ultimo post" label="Imagem do post" />
      <TextInput source="teste" label='Teste' />
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
      <TextInput source="name" label='Nome' />
      <TextInput source="subtitle" label='Slogan' />
      <TextInput source="pass" label='Senha' />
      <NumberInput source="priority" label='Prioridade de exibição' />
      <BooleanInput source="highlighted" label="Exibir em destaque" />
      <LongTextInput source="welcome_messages" label='Mensagens de boas vindas do chat' />

      <ImageInput source="highlight_image" label="Imagem de destaque" accept="image/*">
        <ImageField source="highlight_image" title="Imagem de destaque" />
      </ImageInput>
      <ImageField source="highlight_image" title="Imagem de destaque" />

      <NumberInput source="notification_credits" label='Créditos de notificação' />
      <ImageInput source="logo" label="Logo" accept="image/*">
        <ImageField source="logo" title="name" />
      </ImageInput>
      <ImageField source="logo" title="Logo" />

      <ImageInput source="feed_image" label="Imagem principal do feed" accept="image/*">
        <ImageField source="feed_image" title="name" />
      </ImageInput>
      <ImageField source="feed_image" title="Imagem principal do feed" />

      <ImageInput source="last_post" title="Ultimo post" label="Imagem do post" >
        <ImageField source="feed_image" title="Ultimo post" />
      </ImageInput>
      <ImageField source="last_post" title="Ultimo post" label="Imagem do post" />

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