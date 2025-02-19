import { HomeIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from './components/ui/calendar';
import { Menubar, MenubarMenuProps, Select, SelectMultiple, SelectOptionsProps } from './components/ui-custom';
import { Accordion, AccordionItemProps } from './components/ui-custom/accordion';
import { Alert } from './components/ui-custom/alert';
import { AlertDialog } from './components/ui-custom/alert-dialog';
import { Avatar } from './components/ui-custom/avatar';
import { Breadcrumb } from './components/ui-custom/breadcrumb';
import { Dialog } from './components/ui-custom/dialog';
import { DropdownMenu, DropdownMenuItemProps } from './components/ui-custom/dropdown-menu';
import { Icon } from './components/ui-custom/icon';
import { InputNumber } from './components/ui-custom/input-number';
import { InputOTP } from './components/ui-custom/input-otp';
import { Tabs } from './components/ui-custom/tabs';
import { Button } from '@/components/ui-custom/button';

const AccordionData: AccordionItemProps[] = [
  {
    value: '1',
    title: 'Teste',
    content: 'Teste',
  },
  {
    value: '2',
    title: 'Teste',
    content: 'Teste',
  },
];

const menuItems: DropdownMenuItemProps[] = [
  {
    key: 'separator',
    label: 'Titulo',
    type: 'separator',
  },
  {
    key: 'profile',
    icon: <Icon name="User" size={16} />,
    label: 'Perfil',
    onClick: () => alert('Abrindo perfil...'),
  },

  {
    key: 'settings',
    icon: <Icon name="Settings" size={16} />,
    label: 'Configurações',
    children: [
      {
        key: 'account',
        label: 'Conta',
        onClick: () => alert('Acessando configurações da conta...'),
      },
      {
        key: 'security',
        label: 'Segurança',
        onClick: () => alert('Acessando configurações de segurança...'),
      },
    ],
  },
  {
    key: 'logout',
    icon: <Icon name="LogOut" size={16} />,
    label: 'Sair',
    shortcut: '⌘Q',
    onClick: () => alert('Saindo...'),
  },
];

const menuBarItems: MenubarMenuProps[] = [
  {
    label: 'Arquivo',
    items: [
      {
        key: 'new',
        label: 'Novo',
        icon: <HomeIcon />,
        shortcut: 'Ctrl+N',
        onClick: () => alert('Novo clicado'),
      },
      {
        key: 'open',
        label: 'Abrir',
        shortcut: 'Ctrl+O',
        onClick: () => alert('Abrir clicado'),
      },
      {
        key: 'separator1',
        type: 'separator',
      },
      {
        key: 'exit',
        label: 'Sair',
        onClick: () => alert('Sair clicado'),
      },
    ],
  },
  {
    label: 'Editar',
    items: [
      {
        key: 'undo',
        label: 'Desfazer',
        shortcut: 'Ctrl+Z',
        onClick: () => alert('Desfazer clicado'),
      },
      {
        key: 'redo',
        label: 'Refazer',
        shortcut: 'Ctrl+Y',
        onClick: () => alert('Refazer clicado'),
      },
    ],
  },
  {
    label: 'Configurações',
    items: [
      {
        key: 'profile',
        label: 'Perfil',
        icon: <UserIcon />,
        onClick: () => alert('Perfil clicado'),
        children: [
          {
            key: 'viewProfile',
            label: 'Ver perfil',
            onClick: () => alert('Ver perfil clicado'),
          },
          {
            key: 'editProfile',
            label: 'Editar perfil',
            onClick: () => alert('Editar perfil clicado'),
          },
        ],
      },
      {
        key: 'preferences',
        label: 'Preferências',
        icon: <SettingsIcon />,
        onClick: () => alert('Preferências clicado'),
      },
    ],
  },
];

const tabs: TabsItemProps[] = [
  { value: 'tab1', label: 'Aba 1', content: <p>Conteúdo da Aba 1</p> },
  { value: 'tab2', label: 'Aba 2', content: <p>Conteúdo da Aba 2</p> },
  { value: 'tab3', label: 'Aba 3', content: <p>Conteúdo da Aba 3</p>, disabled: true },
  { value: 'tab4', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab5', label: 'Aba 5', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab6', label: 'Aba 6', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab7', label: 'Aba 7', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab8', label: 'Aba 8', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab9', label: 'Aba 9', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab0', label: 'Aba 1', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab11', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab22', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab33', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab44', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab55', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab66', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab77', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab88', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab99', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab111', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab222', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
  { value: 'tab333', label: 'Aba 4', content: <p>Conteúdo da Aba 4</p> },
];

function App() {
  const [selectedValue, setSelectedValue] = useState([]);

  const options: SelectOptionsProps[] = [
    { value: 'apple', label: 'Maçã' },
    {
      value: 'banana',
      label:
        'Bananaasdasdasdasdasdasdas asd as a s asd as das dad asd as das das das dasd as dasd as daas das as das das as das das d',
    },
    { value: 'grape', label: 'Uva', disabled: true },
    { value: 'orange', label: 'Laranja' },
  ];

  return (
    <div className="m-20">
      <Dialog title="Teste" trigger={<Button>Open Dialog</Button>}>
        <AlertDialog title="Teste">
          <Button size="default" icon="Lock">
            Teste
          </Button>
        </AlertDialog>

        <Tabs
          value="tab222"
          // onValueChange={setSelectedTab}
          tabs={tabs}
          defaultValue="tab1"
          direction="vertical"
        />

        <Accordion data={AccordionData} type="single" collapsible />
        <Alert title="Teste" description="Teste" icon="Lock" />

        <Avatar fallback="K" />

        <InputNumber />

        <InputOTP maxLength={6} />

        <Breadcrumb
          items={[
            { key: '1', label: 'Teste' },
            { key: '1', label: 'Teste' },
            {
              key: '1',
              label: 'Teste',
              children: [
                { key: '1', label: 'Teste' },
                { key: '1', label: 'Teste' },
                { key: '1', label: 'Teste' },
                { key: '1', label: 'Teste' },
              ],
            },
            { key: '1', label: 'Teste', onClick() {} },
            { key: '1', label: 'Teste', isPage: true },
          ]}
        />

        <Menubar menu={menuBarItems} />
        <Calendar />

        <DropdownMenu items={menuItems}>
          <Button variant="outline">Abrir Menu</Button>
        </DropdownMenu>
        <br />
        <br />
        <br />
        <SelectMultiple
          value={selectedValue}
          onValueChange={setSelectedValue}
          options={options}
          placeholder="Selecione uma fruta"
          status={selectedValue === 'banana' ? 'warning' : 'default'}
        />
      </Dialog>
    </div>
  );
}

export default App;
