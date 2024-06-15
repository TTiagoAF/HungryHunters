import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './css/PrivacyPolicy.css';
import { Collapse } from 'antd';

const PrivacyPolicy = () => {
    const items = [
        {
          key: '1',
          label: 'Quem é o responsável pelo tratamento dos seus dados pessoais?',
          children: <p>
         A empresa responsável pelo tratamento dos seus dados pessoais é a HungryHunters. Nós, na HungryHunters, valorizamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais. Abaixo estão os detalhes sobre como lidamos com os seus dados.
          </p>,
        },
        {
          key: '2',
          label: 'Dados pessoais',
          children: <p>Ao utilizar o nosso Serviço, podemos pedir-lhe que nos forneça determinadas informações de identificação pessoal que podem ser utilizadas para o contactar ou identificar. As informações de identificação pessoal podem incluir, mas não estão limitadas a:<br/><br/>Endereço de correio eletrónico<br/>Nome próprio e apelido<br/>Número de telefone<br/>Endereço, estado, província, código postal, cidade<br/>Dados de utilização</p>,
        },
        {
          key: '3',
          label: 'Dados de utilização',
          children: <p>Os Dados de Utilização são recolhidos automaticamente quando utiliza o Serviço.<br/><br/>Os Dados de Utilização podem incluir informações como o endereço de Protocolo de Internet do seu Dispositivo (por exemplo, endereço IP), tipo de browser, versão do browser, as páginas do nosso Serviço que visita, a hora e a data da sua visita, o tempo passado nessas páginas, identificadores únicos de dispositivos e outros dados de diagnóstico.<br/><br/>Quando acede ao Serviço por ou através de um dispositivo móvel, podemos recolher determinadas informações automaticamente, incluindo, entre outras, o tipo de dispositivo móvel que utiliza, a ID exclusiva do seu dispositivo móvel, o endereço IP do seu dispositivo móvel, o sistema operativo do seu dispositivo móvel, o tipo de navegador de Internet móvel que utiliza, identificadores exclusivos de dispositivos e outros dados de diagnóstico.<br/><br/>Também podemos recolher informações que o seu browser envia sempre que visita o nosso Serviço ou quando acede ao Serviço por ou através de um dispositivo móvel.</p>,
        },
        {
          key: '4',
          label: 'Utilização dos seus dados pessoais',
          children: <p>A Empresa pode utilizar os Dados Pessoais para os seguintes fins:<br/><br/>Para fornecer e manter o nosso Serviço, incluindo a monitorização da utilização do nosso Serviço.<br/><br/>Para gerir a sua conta: para gerir o seu registo como utilizador do Serviço. Os Dados Pessoais que fornece podem dar-lhe acesso a diferentes funcionalidades do Serviço que estão disponíveis para si enquanto utilizador registado.<br/><br/>Para a execução de um contrato: o desenvolvimento, cumprimento e execução do contrato de compra dos produtos, artigos ou serviços que adquiriu ou de qualquer outro contrato connosco através do Serviço.<br/><br/>Para contactar o Utilizador: Para o contactar por e-mail, chamadas telefónicas, SMS, ou outras formas equivalentes de comunicação eletrónica, tais como notificações push de uma aplicação móvel sobre actualizações ou comunicações informativas relacionadas com as funcionalidades, produtos ou serviços contratados, incluindo as actualizações de segurança, quando necessário ou razoável para a sua implementação.<br/><br/>Para fornecer ao Utilizador notícias, ofertas especiais e informações gerais sobre outros bens, serviços e eventos que oferecemos e que são semelhantes aos que o Utilizador já adquiriu ou solicitou, exceto se o Utilizador tiver optado por não receber essas informações.<br/><br/>Para gerir os pedidos do Utilizador: Para atender e gerir os pedidos que o Utilizador nos faz.<br/><br/>Para transferências comerciais: Podemos utilizar as suas informações para avaliar ou conduzir uma fusão, alienação, reestruturação, reorganização, dissolução ou outra venda ou transferência de alguns ou de todos os nossos activos, quer como uma empresa em funcionamento, quer como parte de uma falência, liquidação ou processo semelhante, em que os Dados Pessoais detidos por nós sobre os utilizadores do nosso Serviço estejam entre os activos transferidos.<br/><br/>Para outros fins: Poderemos utilizar as informações do Utilizador para outros fins, tais como análise de dados, identificação de tendências de utilização, determinação da eficácia das nossas campanhas promocionais e para avaliar e melhorar o nosso Serviço, produtos, serviços, marketing e a sua experiência.<br/><br/>Podemos partilhar as suas informações pessoais nas seguintes situações:<br/><br/>Com fornecedores de serviços: Podemos partilhar as suas informações pessoais com os Prestadores de Serviços para monitorizar e analisar a utilização do nosso Serviço e para o contactar.<br/>Para transferências comerciais: Podemos partilhar ou transferir as suas informações pessoais em ligação com, ou durante as negociações de, qualquer fusão, venda de activos da Empresa, financiamento ou aquisição da totalidade ou de uma parte da nossa atividade a outra empresa.<br/>Com afiliadas: Podemos partilhar as suas informações com as nossas filiais, caso em que exigiremos que essas filiais respeitem a presente Política de Privacidade. As filiais incluem a nossa empresa-mãe e quaisquer outras subsidiárias, parceiros de joint-venture ou outras empresas que controlamos ou que estão sob controlo comum connosco.Com parceiros comerciais: Podemos partilhar as suas informações com os nossos parceiros comerciais para lhe oferecer determinados produtos, serviços ou promoções.<br/>Com outros utilizadores: quando o Utilizador partilha informações pessoais ou interage de outra forma nas áreas públicas com outros utilizadores, essas informações podem ser vistas por todos os utilizadores e podem ser distribuídas publicamente no exterior.<br/>Com o seu consentimento: Podemos divulgar as suas informações pessoais para qualquer outro fim com o seu consentimento.</p>,
        },
        {
          key: '5',
          label: 'Retenção dos seus dados pessoais',
          children: <p>A Empresa reterá os Dados Pessoais do Utilizador apenas durante o tempo necessário para os fins definidos na presente Política de Privacidade. Iremos reter e utilizar os Dados Pessoais do Utilizador na medida do necessário para cumprir as nossas obrigações legais (por exemplo, se formos obrigados a reter os dados do Utilizador para cumprir a legislação aplicável), resolver litígios e fazer cumprir os nossos acordos e políticas legais.<br/><br/>A Empresa também reterá os Dados de Utilização para fins de análise interna. Os Dados de Utilização são geralmente retidos por um período de tempo mais curto, exceto quando estes dados são utilizados para reforçar a segurança ou para melhorar a funcionalidade do Nosso Serviço, ou quando somos legalmente obrigados a reter estes dados por períodos de tempo mais longos.</p>,
        },
        {
          key: '6',
          label: 'Transferência dos seus dados pessoais',
          children: <p>As suas informações, incluindo os Dados Pessoais, são processadas nos escritórios operacionais da Empresa e em quaisquer outros locais onde as partes envolvidas no processamento estejam localizadas. Isto significa que esta informação pode ser transferida para - e mantida em - computadores localizados fora do seu estado, província, país ou outra jurisdição governamental onde as leis de proteção de dados podem ser diferentes das da sua jurisdição.<br/><br/>O seu consentimento para esta Política de Privacidade, seguido do envio dessas informações, representa o seu acordo para essa transferência.<br/><br/>A Empresa tomará todas as medidas razoavelmente necessárias para garantir que os seus dados sejam tratados com segurança e de acordo com esta Política de Privacidade e nenhuma transferência dos seus Dados Pessoais ocorrerá para uma organização ou um país, a menos que haja controlos adequados em vigor, incluindo a segurança dos seus dados e outras informações pessoais.</p>,
        },
        {
          key: '7',
          label: 'Eliminar os seus dados pessoais',
          children: <p>
          O Utilizador tem o direito de eliminar ou de solicitar que Nós o ajudemos a eliminar os Dados Pessoais que recolhemos sobre si.<br/><br/>O nosso Serviço pode dar-lhe a possibilidade de eliminar determinadas informações sobre si a partir do Serviço.<br/><br/>O Utilizador pode atualizar, alterar ou eliminar as suas informações em qualquer altura, iniciando sessão na sua Conta, se tiver uma, e visitando a secção de definições da conta que lhe permite gerir as suas informações pessoais. O Utilizador também pode contactar-nos para solicitar o acesso, a correção ou a eliminação de quaisquer informações pessoais que nos tenha fornecido.<br/><br/>Tenha em atenção, no entanto, que poderemos ter de reter determinadas informações quando tivermos uma obrigação legal ou uma base legal para o fazer.</p>,
        },
        {
          key: '8',
          label: 'Divulgação dos seus dados pessoais',
          children: <p>Transacções comerciais<br/>Se a Empresa estiver envolvida numa fusão, aquisição ou venda de activos, os Seus Dados Pessoais podem ser transferidos. Iremos notificá-lo antes de os seus Dados Pessoais serem transferidos e ficarem sujeitos a uma Política de Privacidade diferente.<br/><br/>Aplicação da lei<br/>Em determinadas circunstâncias, a Empresa pode ser obrigada a divulgar os seus Dados Pessoais se tal for exigido por lei ou em resposta a pedidos válidos de autoridades públicas (por exemplo, um tribunal ou uma agência governamental).<br/><br/>Outros requisitos legais<br/>A Empresa pode divulgar os Seus Dados Pessoais na convicção de boa fé de que tal ação é necessária para:<br/><br/>Cumprir uma obrigação legal<br/>Proteger e defender os direitos ou a propriedade da Empresa<br/>Prevenir ou investigar possíveis actos ilícitos relacionados com o Serviço<br/>Proteger a segurança pessoal dos Utilizadores do Serviço ou do público<br/>Proteger contra responsabilidade legal</p>,
        },
        {
          key: '9',
          label: 'Segurança dos seus dados pessoais',
          children: <p>A segurança dos Seus Dados Pessoais é importante para Nós, mas lembre-se que nenhum método de transmissão através da Internet ou método de armazenamento eletrónico é 100% seguro. Embora nos esforcemos por utilizar meios comercialmente aceitáveis para proteger os seus Dados Pessoais, não podemos garantir a sua segurança absoluta.</p>,
        },
        {
          key: '10',
          label: 'Alterações a esta Política de Privacidade',
          children: <p>Poderemos atualizar a nossa Política de Privacidade ocasionalmente. Notificá-lo-emos de quaisquer alterações, publicando a nova Política de Privacidade nesta página.<br/><br/>Informá-lo-emos por correio eletrónico e/ou através de um aviso destacado no Nosso Serviço, antes de a alteração entrar em vigor, e actualizaremos a data da “Última atualização” no topo desta Política de Privacidade.<br/><br/>Aconselhamos o Utilizador a rever periodicamente esta Política de Privacidade para verificar se existem alterações. As alterações a esta Política de Privacidade entram em vigor quando são publicadas nesta página.</p>,
        },
        {
          key: '11',
          label: 'Contactar-nos',
          children: <p>Se tiver alguma dúvida sobre esta Política de Privacidade, pode contactar-nos:<br/><br/>Por correio eletrónico: support@hungryhunters.com</p>,
        },
      ];
  return (
    <div>
        <Header/>
    <div className="privacy-policy-container">
      <h1>Política de Privacidade</h1>
      <p>Última atualização: 24 de maio de 2024</p>
      <Collapse items={items}/>
    </div>
    <Footer/>
    </div>
  );
};

export default PrivacyPolicy;