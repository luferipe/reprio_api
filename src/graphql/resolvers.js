
import { db } from '../services/firebase.js';
import { collection, getDocs, DocumentReference, doc, getDoc, query, where } from 'firebase/firestore';

export const resolvers = {
  Query: {

    getUsers: async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => {
        const data = doc.data();
        
        return {
          id: doc.id,
          ...data,
          admin_empresa: data.admin_empresa instanceof DocumentReference ? data.admin_empresa.path : null,
          empresa_ref: data.empresa_ref instanceof DocumentReference ? data.empresa_ref.path : null,
        };
      });
      return usersList;
    },

    getUser: async (_, { id }) => {
      try {
        // Cria a referência ao documento no Firestore
        const userDoc = doc(db, 'users', id);

        // Obtém o documento com base na referência
        const userSnapshot = await getDoc(userDoc);

        // Verifica se o documento existe
        if (!userSnapshot.exists()) {
          throw new Error(`User with ID ${id} not found.`);
        }

        // Extrai os dados do documento
        const data = userSnapshot.data();

        // Retorna os dados do usuário no formato esperado
        return {
          id: userSnapshot.id,
          ...data,
          admin_empresa: data.admin_empresa instanceof DocumentReference ? data.admin_empresa.path : null,
          empresa_ref: data.empresa_ref instanceof DocumentReference ? data.empresa_ref.path : null,
        };
      } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error.message);
        throw new Error('Failed to fetch user data.');
      }
    },

    getClientes: async () => {
      const clientesCollection = collection(db, 'Clientes');
      const clientesSnapshot = await getDocs(clientesCollection);
      const clientesList = clientesSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          bairro: data.Bairro || null,
          cep: data.CEP || null,
          cnpj: data.CNPJ || null,
          cpf: data.CPF || null,
          cidade: data.Cidade || null,
          complemento: data.Complemento || null,
          ean: data.EAN || null,
          email_comercial: data.Email_Comercial || null,
          email_financeiro: data.Email_Financeiro || null,
          endereco: data.Endereco || null,
          inscricao_estadual: data.Inscricao_Estadual || null,
          nome_completo: data.Nome_Completo || null,
          nome_fantasia: data.Nome_Fantasia || null,
          numero: data.Numero || null,
          observacoes: data.Observacoes || null,
          rg: data.RG || null,
          razao_social: data.Razao_Social || null,
          telefone_1: data.Telefone_1 || null,
          telefone_2: data.Telefone_2 || null,
          telefone_3: data.Telefone_3 || null,
          telefone_4: data.Telefone_4 || null,
          tipo_cliente: data.Tipo_Cliente || null,
          uf: data.UF || null,
          data_criacao: data.data_criacao ? data.data_criacao.toDate().toISOString() : null,
          empresa_ref: data.empresa_ref instanceof DocumentReference ? data.empresa_ref.path : null,
          user_ref: data.user_ref instanceof DocumentReference ? data.user_ref.path : null,
          contatos: data.Contatos ? data.Contatos.map(contato => ({
            cargo: contato.Cargo || null,
            email: contato.Email || null,
            nome: contato.Nome || null,
            telefone: contato.Telefone || null,
            user_ref: contato.user_ref instanceof DocumentReference ? contato.user_ref.path : null,
          })) : [],
        };
      });
      return clientesList;
    },

    getCliente: async (_, { id }) => {
      try {
        const clienteDoc = doc(db, 'Clientes', id);
        const clienteSnapshot = await getDoc(clienteDoc);

        if (!clienteSnapshot.exists()) {
          throw new Error(`Cliente with ID ${id} not found.`);
        }

        const data = clienteSnapshot.data();

        return {
          id: clienteSnapshot.id,
          bairro: data.Bairro || null,
          cep: data.CEP || null,
          cnpj: data.CNPJ || null,
          cpf: data.CPF || null,
          cidade: data.Cidade || null,
          complemento: data.Complemento || null,
          ean: data.EAN || null,
          email_comercial: data.Email_Comercial || null,
          email_financeiro: data.Email_Financeiro || null,
          endereco: data.Endereco || null,
          inscricao_estadual: data.Inscricao_Estadual || null,
          nome_completo: data.Nome_Completo || null,
          nome_fantasia: data.Nome_Fantasia || null,
          numero: data.Numero || null,
          observacoes: data.Observacoes || null,
          rg: data.RG || null,
          razao_social: data.Razao_Social || null,
          telefone_1: data.Telefone_1 || null,
          telefone_2: data.Telefone_2 || null,
          telefone_3: data.Telefone_3 || null,
          telefone_4: data.Telefone_4 || null,
          tipo_cliente: data.Tipo_Cliente || null,
          uf: data.UF || null,
          data_criacao: data.data_criacao ? data.data_criacao.toDate().toISOString() : null,
          empresa_ref: data.empresa_ref instanceof DocumentReference ? data.empresa_ref.path : null,
          user_ref: data.user_ref instanceof DocumentReference ? data.user_ref.path : null,
          contatos: data.Contatos ? data.Contatos.map(contato => ({
            cargo: contato.Cargo || null,
            email: contato.Email || null,
            nome: contato.Nome || null,
            telefone: contato.Telefone || null,
            user_ref: contato.user_ref instanceof DocumentReference ? contato.user_ref.path : null,
          })) : [],
        };
      } catch (error) {
        console.error(`Error fetching cliente with ID ${id}:`, error.message);
        throw new Error('Failed to fetch cliente data.');
      }
    },

    getEmpresas: async () => {
      const empresasCollection = collection(db, 'Empresa');
      const empresasSnapshot = await getDocs(empresasCollection);
      const empresasList = empresasSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          cnpj: data.CNPJ || null,
          ean: data.EAN || null,
          admin_empresa: data.admin_empresa instanceof DocumentReference ? data.admin_empresa.path : null,
          endereco_empresa: {
            uf: data.endereco_empresa?.UF || null,
            bairro: data.endereco_empresa?.bairro || null,
            cep: data.endereco_empresa?.cep || null,
            cidade: data.endereco_empresa?.cidade || null,
            complemento: data.endereco_empresa?.complemento || null,
            endereco: data.endereco_empresa?.endereco || null,
            numero: data.endereco_empresa?.numero || null,
          },
          inscricao_estadual: data.inscricao_estadual || null,
          logo: data.logo || null,
          nome_fantasia: data.nome_fantasia || null,
          onbording_empresa: data.onbording_empresa || null,
          ramo_atividade: data.ramo_atividade || null,
          razao_social: data.razao_social || null,
        };
      });
      return empresasList;
    },

    getEmpresa: async (_, { id }) => {
      try {
        const empresaDoc = doc(db, 'Empresa', id);
        const empresaSnapshot = await getDoc(empresaDoc);

        // Verifica se o documento existe
        if (!empresaSnapshot.exists()) {
          throw new Error(`Empresa with ID ${id} not found.`);
        }

        const data = empresaSnapshot.data();

        // Retorna os dados da empresa no formato esperado
        return {
          id: empresaSnapshot.id,
          cnpj: data.CNPJ || null,
          ean: data.EAN || null,
          admin_empresa: data.admin_empresa instanceof DocumentReference ? data.admin_empresa.path : null,
          endereco_empresa: {
            uf: data.endereco_empresa?.UF || null,
            bairro: data.endereco_empresa?.bairro || null,
            cep: data.endereco_empresa?.cep || null,
            cidade: data.endereco_empresa?.cidade || null,
            complemento: data.endereco_empresa?.complemento || null,
            endereco: data.endereco_empresa?.endereco || null,
            numero: data.endereco_empresa?.numero || null,
          },
          inscricao_estadual: data.inscricao_estadual || null,
          logo: data.logo || null,
          nome_fantasia: data.nome_fantasia || null,
          onbording_empresa: data.onbording_empresa || null,
          ramo_atividade: data.ramo_atividade || null,
          razao_social: data.razao_social || null,
        };
      } catch (error) {
        console.error(`Error fetching empresa with ID ${id}:`, error.message);
        throw new Error(`Failed to fetch empresa data: ${error.message}`);
      }
    },

    getEquipes: async () => {
      const equipesCollection = collection(db, 'Equipe');
      const equipesSnapshot = await getDocs(equipesCollection);
      const equipesList = equipesSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          aniversario_dia: data.Aniversario_dia || null,
          aniversario_mes: data.Aniversario_mes || null,
          bairro: data.Bairro || null,
          cep: data.CEP || null,
          cpf: data.CPF || null,
          cidade: data.Cidade || null,
          complemento: data.Complemento || null,
          data_criacao: data.Data_Criacao ? data.Data_Criacao.toDate().toISOString() : null,
          email: data.Email || null,
          email_user: data.Email_User || null,
          endereco: data.Endereco || null,
          nome_completo: data.Nome_Completo || null,
          numero: data.Numero || null,
          observacoes: data.Observacoes || null,
          permissoes: {
            acesso_aplicativo: data.Permissoes?.acesso_aplicativo || false,
            cadastrar_novos_clientes: data.Permissoes?.cadastrar_novos_clientes || false,
            enviar_pedido_cliente_bloqueado: data.Permissoes?.enviar_pedido_cliente_bloqueado || false,
            visualizar_totais_pedidos: data.Permissoes?.visualizar_totais_pedidos || false,
          },
          rg: data.RG || null,
          repasse_colaborador: data.Repasse_Colaborador || 0,
          status: data.Status || false,
          telefone_1: data.Telefone_1 || null,
          tipo_usuario: data.Tipo_Usuario || null,
          uf: data.UF || null,
          codigo_usuario: data.codigo_usuario || null,
          colaborador: data.colaborador || null,
          empresa_ref: data.empres_ref instanceof DocumentReference ? data.empres_ref.path : null,
          user_ref: data.user_ref instanceof DocumentReference ? data.user_ref.path : null,
          representadas_equipe: data.representadas_equipe ? data.representadas_equipe.map(rep => ({
            codigo: rep.Codigo || null,
            nome_representada: rep.Nome_Representada || null,
            status: rep.Status || false,
            equipe_ref: rep.equipe_ref instanceof DocumentReference ? rep.equipe_ref.path : null,
            ref_representada: rep.ref_representada instanceof DocumentReference ? rep.ref_representada.path : null,
          })) : [],
        };
      });
      return equipesList;
    },

    getEquipe: async (_, { id }) => {
      try {
        const equipeDoc = doc(db, 'Equipe', id);
        const equipeSnapshot = await getDoc(equipeDoc);

        if (!equipeSnapshot.exists()) {
          throw new Error(`Equipe with ID ${id} not found.`);
        }

        const data = equipeSnapshot.data();

        return {
          id: equipeSnapshot.id,
          aniversario_dia: data.Aniversario_dia || null,
          aniversario_mes: data.Aniversario_mes || null,
          bairro: data.Bairro || null,
          cep: data.CEP || null,
          cpf: data.CPF || null,
          cidade: data.Cidade || null,
          complemento: data.Complemento || null,
          data_criacao: data.Data_Criacao ? data.Data_Criacao.toDate().toISOString() : null,
          email: data.Email || null,
          email_user: data.Email_User || null,
          endereco: data.Endereco || null,
          nome_completo: data.Nome_Completo || null,
          numero: data.Numero || null,
          observacoes: data.Observacoes || null,
          permissoes: {
            acesso_aplicativo: data.Permissoes?.acesso_aplicativo || false,
            cadastrar_novos_clientes: data.Permissoes?.cadastrar_novos_clientes || false,
            enviar_pedido_cliente_bloqueado: data.Permissoes?.enviar_pedido_cliente_bloqueado || false,
            visualizar_totais_pedidos: data.Permissoes?.visualizar_totais_pedidos || false,
          },
          rg: data.RG || null,
          repasse_colaborador: data.Repasse_Colaborador || 0,
          status: data.Status || false,
          telefone_1: data.Telefone_1 || null,
          tipo_usuario: data.Tipo_Usuario || null,
          uf: data.UF || null,
          codigo_usuario: data.codigo_usuario || null,
          colaborador: data.colaborador || null,
          empresa_ref: data.empres_ref instanceof DocumentReference ? data.empres_ref.path : null,
          user_ref: data.user_ref instanceof DocumentReference ? data.user_ref.path : null,
          representadas_equipe: data.representadas_equipe ? data.representadas_equipe.map(rep => ({
            codigo: rep.Codigo || null,
            nome_representada: rep.Nome_Representada || null,
            status: rep.Status || false,
            equipe_ref: rep.equipe_ref instanceof DocumentReference ? rep.equipe_ref.path : null,
            ref_representada: rep.ref_representada instanceof DocumentReference ? rep.ref_representada.path : null,
          })) : [],
        };
      } catch (error) {
        console.error(`Error fetching equipe with ID ${id}:`, error.message);
        throw new Error('Failed to fetch equipe data.');
      }
    },

    getMetas: async () => {
      const metasCollection = collection(db, 'Metas');
      const metasSnapshot = await getDocs(metasCollection);
      const metasList = metasSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          ano: data.ano || null,
          representada: {
            empresa_ref: data.representadas?.empresa_ref instanceof DocumentReference ? data.representadas.empresa_ref.path : null,
            representada_ref: data.representadas?.representada_ref instanceof DocumentReference ? data.representadas.representada_ref.path : null,
          },
          meses: Object.keys(data).filter(key => !isNaN(parseInt(key))).map(mes => ({
            mes: parseInt(mes),
            valor: data[mes] || 0,
          })),
        };
      });
      return metasList;
    },

    getMeta: async (_, { id }) => {
      try {
        const metaDoc = doc(db, 'Metas', id);
        const metaSnapshot = await getDoc(metaDoc);

        if (!metaSnapshot.exists()) {
          throw new Error(`Meta with ID ${id} not found.`);
        }

        const data = metaSnapshot.data();

        return {
          id: metaSnapshot.id,
          ano: data.ano || null,
          representada: {
            empresa_ref: data.representadas?.empresa_ref instanceof DocumentReference ? data.representadas.empresa_ref.path : null,
            representada_ref: data.representadas?.representada_ref instanceof DocumentReference ? data.representadas.representada_ref.path : null,
          },
          meses: Object.keys(data).filter(key => !isNaN(parseInt(key))).map(mes => ({
            mes: parseInt(mes),
            valor: data[mes] || 0,
          })),
        };
      } catch (error) {
        console.error(`Error fetching meta with ID ${id}:`, error.message);
        throw new Error('Failed to fetch meta data.');
      }
    },

    getProdutos: async () => {
      const produtosCollection = collection(db, 'Produtos');
      const produtosSnapshot = await getDocs(produtosCollection);
      const produtosList = await Promise.all(produtosSnapshot.docs.map(async doc => {
        const data = doc.data();

        // Busca os preços associados ao produto na coleção PrecosTabela
        const precosTabelaCollection = collection(db, `Produtos/${doc.id}/PrecosTabela`);
        const precosSnapshot = await getDocs(precosTabelaCollection);
        const precosTabela = precosSnapshot.docs.map(precoDoc => {
          const precoData = precoDoc.data();
          return {
            nome_tabela: precoData.nome_tabela || null,
            preco: precoData.preco || 0,
            preco_promocional: precoData.preco_promocional || 0,
            produto_ref: precoData.produto_ref instanceof DocumentReference ? precoData.produto_ref.path : null,
            status: precoData.status || false,
            tabela_ref: precoData.tabela_ref instanceof DocumentReference ? precoData.tabela_ref.path : null,
          };
        });

        return {
          id: doc.id,
          cod_sku: data.COD_SKU || null,
          categoria: data.Categoria || null,
          codigo_barras: data.Codigo_Barras || null,
          comissao: data.Comissao || 0,
          cubagem: data.Cubagem || 0,
          img_produto: data.IMG_produto || null,
          ipi: data.IPI || 0,
          ncm: data.NCM || 0,
          nome: data.Nome || null,
          peso_bruto: data.Peso_Bruto || 0,
          peso_liquido: data.Peso_Liquido || 0,
          qtd_multiplos: data.QTD_Multiplos || 0,
          unidade: data.Unidade || null,
          data_criacao: data.data_criacao ? data.data_criacao.toDate().toISOString() : null,
          representada_ref: data.representada_ref instanceof DocumentReference ? data.representada_ref.path : null,
          status: data.status || false,
          precos_tabela: precosTabela,
        };
      }));
      return produtosList;
    },

    getProduto: async (_, { id }) => {
      try {
        const produtoDoc = doc(db, 'Produtos', id);
        const produtoSnapshot = await getDoc(produtoDoc);

        if (!produtoSnapshot.exists()) {
          throw new Error(`Produto with ID ${id} not found.`);
        }

        const data = produtoSnapshot.data();

        // Busca os preços associados ao produto na coleção PrecosTabela
        const precosTabelaCollection = collection(db, `Produtos/${id}/PrecosTabela`);
        const precosSnapshot = await getDocs(precosTabelaCollection);
        const precosTabela = precosSnapshot.docs.map(precoDoc => {
          const precoData = precoDoc.data();
          return {
            nome_tabela: precoData.nome_tabela || null,
            preco: precoData.preco || 0,
            preco_promocional: precoData.preco_promocional || 0,
            produto_ref: precoData.produto_ref instanceof DocumentReference ? precoData.produto_ref.path : null,
            status: precoData.status || false,
            tabela_ref: precoData.tabela_ref instanceof DocumentReference ? precoData.tabela_ref.path : null,
          };
        });

        return {
          id: produtoSnapshot.id,
          cod_sku: data.COD_SKU || null,
          categoria: data.Categoria || null,
          codigo_barras: data.Codigo_Barras || null,
          comissao: data.Comissao || 0,
          cubagem: data.Cubagem || 0,
          img_produto: data.IMG_produto || null,
          ipi: data.IPI || 0,
          ncm: data.NCM || 0,
          nome: data.Nome || null,
          peso_bruto: data.Peso_Bruto || 0,
          peso_liquido: data.Peso_Liquido || 0,
          qtd_multiplos: data.QTD_Multiplos || 0,
          unidade: data.Unidade || null,
          data_criacao: data.data_criacao ? data.data_criacao.toDate().toISOString() : null,
          representada_ref: data.representada_ref instanceof DocumentReference ? data.representada_ref.path : null,
          status: data.status || false,
          precos_tabela: precosTabela,
        };
      } catch (error) {
        console.error(`Error fetching produto with ID ${id}:`, error.message);
        throw new Error('Failed to fetch produto data.');
      }
    },

    getRepresentadas: async () => {
      const representadasCollection = collection(db, 'Representada');
      const representadasSnapshot = await getDocs(representadasCollection);
      const representadasList = representadasSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          cadastro: data.Cadastro ? data.Cadastro.toDate().toISOString() : null,
          comercializacao: {
            acrescimo_max: data.Comercializacao?.Acrescimo_Max || 0,
            desconto_01: data.Comercializacao?.Desconto_01 || 0,
            desconto_02: data.Comercializacao?.Desconto_02 || 0,
            desconto_03: data.Comercializacao?.Desconto_03 || 0,
            desconto_04: data.Comercializacao?.Desconto_04 || 0,
            desconto_geral: data.Comercializacao?.Desconto_Geral || false,
            meta_igual_mes: data.Comercializacao?.Meta_Igual_Mes || false,
            meta_mensalmente: data.Comercializacao?.Meta_mensalmente || false,
            meta_todos_meses: data.Comercializacao?.meta_todos_mese || 0,
          },
          email: data.Email || null,
          endereco_bairro: data.Endereco_Bairro || null,
          endereco_cep: data.Endereco_CEP || null,
          endereco_cidade: data.Endereco_Cidade || null,
          endereco_complemento: data.Endereco_Complemento || null,
          endereco_numero: data.Endereco_Numero || null,
          endereco_rua: data.Endereco_Rua || null,
          endereco_uf: data.Endereco_UF || null,
          nome_fantasia: data.Nome_Fantasia || null,
          pagamentos: {
            regr_comissao_representante: data.Pagamentos?.RegrComissao_Representante || 0,
            regr_comissao_vendedor: data.Pagamentos?.RegrComissao_Vendedor || 0,
            regr_pag_representante_pedido: data.Pagamentos?.RegrPagRepresentante_Pedido || 0,
            regr_pag_representante_titulo: data.Pagamentos?.RegrPagRepresentante_Titulo || 0,
            regr_pag_vendedor_pedido: data.Pagamentos?.RegrPagVendedor_Pedido || 0,
            regr_pag_vendedor_titulo: data.Pagamentos?.RegrPagVendedor_Titulo || 0,
          },
          ramo_atividade: data.Ramo_Atividade || null,
          razao_social: data.Razao_Social || null,
          site: data.Site || null,
          status: data.Status || false,
          telefone_01: data.Telefone_01 || null,
          user_ref: data.User_ref instanceof DocumentReference ? data.User_ref.path : null,
          cnpj: data.cnpj || null,
          ean: data.ean || null,
          empresa_ref: data.empres_ref instanceof DocumentReference ? data.empres_ref.path : null,
          inscricao_estadual: data.inscricao_Estadual || null,
          logotipo: data.logotipo || null,
          prazos: {
            desconto_extra: data.Prazos?.Desconto_Extra || 0,
            nome_prazo: data.Prazos?.Nome_Prazo || null,
            pedido_minimo: data.Prazos?.Pedido_Minimo || 0,
            valido_tabelas_selecionadas: data.Prazos?.Valido_Tabelas_Selecionadas || false,
            valido_todas_tabelas: data.Prazos?.Valido_Todas_Tabelas || true,
            ativo: data.Prazos?.ativo || true,
            parcelas: data.Prazos?.Parcelas ? data.Prazos.Parcelas.map(parcela => ({
              parcela: parcela.Parcela || 0,
              qtd_dias: parcela.QTD_DIAS || "0",
            })) : [],
          },
          tabela: {
            comissao_representante: data.Tabela?.Comissao_Representante || 0,
            comissao_vendedor: data.Tabela?.Comissao_Vendedor || 0,
            comissao_vendedor_separadamente: data.Tabela?.Comissao_Vendedor_Separadamente || false,
            desconto_01: data.Tabela?.Desconto_01 || 0,
            desconto_02: data.Tabela?.Desconto_02 || 0,
            desconto_03: data.Tabela?.Desconto_03 || 0,
            desconto_04: data.Tabela?.Desconto_04 || 0,
            nome_tabela: data.Tabela?.Nome_Tabela || null,
            observacoes: data.Tabela?.Observacoes || null,
            validade_tabela: data.Tabela?.Validade_Tabela ? data.Tabela.Validade_Tabela.toDate().toISOString() : null,
            valido_todos_clientes: data.Tabela?.Valido_Todos_Clientes || false,
            codigo_na_representada: data.Tabela?.codigo_na_representada || null,
            data_criacao: data.Tabela?.data_criacao ? data.Tabela.data_criacao.toDate().toISOString() : null,
            status: data.Tabela?.status || false,
          },
          vendedor: {
            ativar_limites_descontos_separadamente: data.Vendedor?.Ativar_Limites_Descontos_Separadamente || false,
            foto_perfil: data.Vendedor?.Foto_Perfil || null,
            nome_vendedor: data.Vendedor?.NomeVendedor || null,
            p_desconto_itens_promo: data.Vendedor?.P_Desconto_Itens_Promo || false,
            p_digitar_preco: data.Vendedor?.P_Digitar_Preco || false,
            vendedor_ref: data.Vendedor?.Vendedor instanceof DocumentReference ? data.Vendedor.Vendedor.path : null,
            desconto1: data.Vendedor?.desconto1 || 0,
            desconto2: data.Vendedor?.desconto2 || 0,
            desconto3: data.Vendedor?.desconto3 || 0,
            desconto4: data.Vendedor?.desconto4 || 0,
            status: data.Vendedor?.status || false,
          },
        };
      });
      return representadasList;
    },

    getRepresentada: async (_, { id }) => {
      try {
        const representadaDoc = doc(db, 'Representada', id);
        const representadaSnapshot = await getDoc(representadaDoc);

        if (!representadaSnapshot.exists()) {
          throw new Error(`Representada with ID ${id} not found.`);
        }

        const data = representadaSnapshot.data();

        return {
          id: representadaSnapshot.id,
          cadastro: data.Cadastro ? data.Cadastro.toDate().toISOString() : null,
          comercializacao: {
            acrescimo_max: data.Comercializacao?.Acrescimo_Max || 0,
            desconto_01: data.Comercializacao?.Desconto_01 || 0,
            desconto_02: data.Comercializacao?.Desconto_02 || 0,
            desconto_03: data.Comercializacao?.Desconto_03 || 0,
            desconto_04: data.Comercializacao?.Desconto_04 || 0,
            desconto_geral: data.Comercializacao?.Desconto_Geral || false,
            meta_igual_mes: data.Comercializacao?.Meta_Igual_Mes || false,
            meta_mensalmente: data.Comercializacao?.Meta_mensalmente || false,
            meta_todos_meses: data.Comercializacao?.meta_todos_mese || 0,
          },
          email: data.Email || null,
          endereco_bairro: data.Endereco_Bairro || null,
          endereco_cep: data.Endereco_CEP || null,
          endereco_cidade: data.Endereco_Cidade || null,
          endereco_complemento: data.Endereco_Complemento || null,
          endereco_numero: data.Endereco_Numero || null,
          endereco_rua: data.Endereco_Rua || null,
          endereco_uf: data.Endereco_UF || null,
          nome_fantasia: data.Nome_Fantasia || null,
          pagamentos: {
            regr_comissao_representante: data.Pagamentos?.RegrComissao_Representante || 0,
            regr_comissao_vendedor: data.Pagamentos?.RegrComissao_Vendedor || 0,
            regr_pag_representante_pedido: data.Pagamentos?.RegrPagRepresentante_Pedido || 0,
            regr_pag_representante_titulo: data.Pagamentos?.RegrPagRepresentante_Titulo || 0,
            regr_pag_vendedor_pedido: data.Pagamentos?.RegrPagVendedor_Pedido || 0,
            regr_pag_vendedor_titulo: data.Pagamentos?.RegrPagVendedor_Titulo || 0,
          },
          ramo_atividade: data.Ramo_Atividade || null,
          razao_social: data.Razao_Social || null,
          site: data.Site || null,
          status: data.Status || false,
          telefone_01: data.Telefone_01 || null,
          user_ref: data.User_ref instanceof DocumentReference ? data.User_ref.path : null,
          cnpj: data.cnpj || null,
          ean: data.ean || null,
          empresa_ref: data.empres_ref instanceof DocumentReference ? data.empres_ref.path : null,
          inscricao_estadual: data.inscricao_Estadual || null,
          logotipo: data.logotipo || null,
          prazos: {
            desconto_extra: data.Prazos?.Desconto_Extra || 0,
            nome_prazo: data.Prazos?.Nome_Prazo || null,
            pedido_minimo: data.Prazos?.Pedido_Minimo || 0,
            valido_tabelas_selecionadas: data.Prazos?.Valido_Tabelas_Selecionadas || false,
            valido_todas_tabelas: data.Prazos?.Valido_Todas_Tabelas || true,
            ativo: data.Prazos?.ativo || true,
            parcelas: data.Prazos?.Parcelas ? data.Prazos.Parcelas.map(parcela => ({
              parcela: parcela.Parcela || 0,
              qtd_dias: parcela.QTD_DIAS || "0",
            })) : [],
          },
          tabela: {
            comissao_representante: data.Tabela?.Comissao_Representante || 0,
            comissao_vendedor: data.Tabela?.Comissao_Vendedor || 0,
            comissao_vendedor_separadamente: data.Tabela?.Comissao_Vendedor_Separadamente || false,
            desconto_01: data.Tabela?.Desconto_01 || 0,
            desconto_02: data.Tabela?.Desconto_02 || 0,
            desconto_03: data.Tabela?.Desconto_03 || 0,
            desconto_04: data.Tabela?.Desconto_04 || 0,
            nome_tabela: data.Tabela?.Nome_Tabela || null,
            observacoes: data.Tabela?.Observacoes || null,
            validade_tabela: data.Tabela?.Validade_Tabela ? data.Tabela.Validade_Tabela.toDate().toISOString() : null,
            valido_todos_clientes: data.Tabela?.Valido_Todos_Clientes || false,
            codigo_na_representada: data.Tabela?.codigo_na_representada || null,
            data_criacao: data.Tabela?.data_criacao ? data.Tabela.data_criacao.toDate().toISOString() : null,
            status: data.Tabela?.status || false,
          },
          vendedor: {
            ativar_limites_descontos_separadamente: data.Vendedor?.Ativar_Limites_Descontos_Separadamente || false,
            foto_perfil: data.Vendedor?.Foto_Perfil || null,
            nome_vendedor: data.Vendedor?.NomeVendedor || null,
            p_desconto_itens_promo: data.Vendedor?.P_Desconto_Itens_Promo || false,
            p_digitar_preco: data.Vendedor?.P_Digitar_Preco || false,
            vendedor_ref: data.Vendedor?.Vendedor instanceof DocumentReference ? data.Vendedor.Vendedor.path : null,
            desconto1: data.Vendedor?.desconto1 || 0,
            desconto2: data.Vendedor?.desconto2 || 0,
            desconto3: data.Vendedor?.desconto3 || 0,
            desconto4: data.Vendedor?.desconto4 || 0,
            status: data.Vendedor?.status || false,
          },
        };
      } catch (error) {
        console.error(`Error fetching representada with ID ${id}:`, error.message);
        throw new Error('Failed to fetch representada data.');
      }
    },

    getTransportadoras: async () => {
      const transportadorasCollection = collection(db, 'Transportadoras');
      const transportadorasSnapshot = await getDocs(transportadorasCollection);
      const transportadorasList = transportadorasSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          bairro: data.Bairro || null,
          cep: data.CEP || null,
          cnpj: data.CNPJ || null,
          cidade: data.Cidade || null,
          complemento: data.Complemento || null,
          ean: data.EAN || null,
          email_comercial: data.Email_Comercial || null,
          email_financeiro: data.Email_Financeiro || null,
          endereco: data.Endereco || null,
          inscricao_estadual: data.Inscricao_Estadual || null,
          nome_fantasia: data.Nome_Fantasia || null,
          numero: data.Numero || null,
          razao_social: data.Razao_Social || null,
          status: data.Status || false,
          telefone1: data.Telefone1 || null,
          telefone2: data.Telefone2 || null,
          telefone3: data.Telefone3 || null,
          telefone4: data.Telefone4 || null,
          uf: data.UF || null,
          data_cadastro: data.data_cadastro ? data.data_cadastro.toDate().toISOString() : null,
          empresa_ref: data.empres_ref instanceof DocumentReference ? data.empres_ref.path : null,
        };
      });
      return transportadorasList;
    },

    getTransportadora: async (_, { id }) => {
      try {
        const transportadoraDoc = doc(db, 'Transportadoras', id);
        const transportadoraSnapshot = await getDoc(transportadoraDoc);

        if (!transportadoraSnapshot.exists()) {
          throw new Error(`Transportadora with ID ${id} not found.`);
        }

        const data = transportadoraSnapshot.data();

        return {
          id: transportadoraSnapshot.id,
          bairro: data.Bairro || null,
          cep: data.CEP || null,
          cnpj: data.CNPJ || null,
          cidade: data.Cidade || null,
          complemento: data.Complemento || null,
          ean: data.EAN || null,
          email_comercial: data.Email_Comercial || null,
          email_financeiro: data.Email_Financeiro || null,
          endereco: data.Endereco || null,
          inscricao_estadual: data.Inscricao_Estadual || null,
          nome_fantasia: data.Nome_Fantasia || null,
          numero: data.Numero || null,
          razao_social: data.Razao_Social || null,
          status: data.Status || false,
          telefone1: data.Telefone1 || null,
          telefone2: data.Telefone2 || null,
          telefone3: data.Telefone3 || null,
          telefone4: data.Telefone4 || null,
          uf: data.UF || null,
          data_cadastro: data.data_cadastro ? data.data_cadastro.toDate().toISOString() : null,
          empresa_ref: data.empres_ref instanceof DocumentReference ? data.empres_ref.path : null,
        };
      } catch (error) {
        console.error(`Error fetching transportadora with ID ${id}:`, error.message);
        throw new Error('Failed to fetch transportadora data.');
      }
    },

    // Pedidos
    getPedidos: async () => {
      const pedidosCollection = collection(db, 'pedidos');
      const pedidosSnapshot = await getDocs(pedidosCollection);
      const pedidosList = await Promise.all(pedidosSnapshot.docs.map(async doc => {
        const data = doc.data();

        // Busca os preços e pagamentos associados ao pedido
        const precosEpagamentosCollection = collection(db, `pedidos/${doc.id}/PrecosEpagamentos`);
        const precosSnapshot = await getDocs(precosEpagamentosCollection);
        const precosEpagamentos = precosSnapshot.docs.map(precoDoc => {
          const precoData = precoDoc.data();
          return {
            st: precoData.ST || 0,
            acrescimo_extra: precoData.acrescimo_extra || 0,
            acrescimo_geral: precoData.acrescimo_geral || 0,
            comissao_representante: precoData.comissao_representante || 0,
            comissao_vendedor: precoData.comissao_vendedor || 0,
            desconto_1: precoData.desconto_1 || 0,
            desconto_2: precoData.desconto_2 || 0,
            desconto_3: precoData.desconto_3 || 0,
            desconto_4: precoData.desconto_4 || 0,
            desconto_extra: precoData.desconto_extra || 0,
            frete: precoData.frete || 0,
            nome_prazo: precoData.nomePrazo || null,
            pedido_ref: precoData.pedido_ref instanceof DocumentReference ? precoData.pedido_ref.path : null,
            prazo_pagamento_data: precoData.prazo_pagamento_data ? precoData.prazo_pagamento_data.toDate().toISOString() : null,
            prazo_pagamento_dia: precoData.prazo_pagamento_dia || 0,
            tabela_preco_nome: precoData.tabela_preco_nome || null,
            tabela_preco_ref: precoData.tabela_preco_ref instanceof DocumentReference ? precoData.tabela_preco_ref.path : null,
          };
        })[0]; // Assumindo que há apenas um documento em `PrecosEpagamentos`

        // Busca os produtos associados ao pedido
        const produtosPedidoCollection = collection(db, `pedidos/${doc.id}/ProdutosPedido`);
        const produtosSnapshot = await getDocs(produtosPedidoCollection);
        const produtosPedido = produtosSnapshot.docs.map(produtoDoc => {
          const produtoData = produtoDoc.data();
          return {
            codigo: produtoData.codigo || null,
            imagem: produtoData.imagem || null,
            ipi: produtoData.ipi || 0,
            nome: produtoData.nome || null,
            pedido_ref: produtoData.pedido_ref instanceof DocumentReference ? produtoData.pedido_ref.path : null,
            preco: produtoData.preco || 0,
            preco_liquido: produtoData.preco_liquido || 0,
            quantidade: produtoData.quantidade || 0,
            subtotal_liquido: produtoData.subtotal_liquido || 0,
            unidade: produtoData.unidade || null,
          };
        });

        return {
          id: doc.id,
          acrescimo_total_db: data.acrescimoTotalDb || 0,
          acrescimo_total_por_cento: data.acrescimoTotalPorCento || 0,
          cliente_nome: data.cliente_nome || null,
          cliente_ref: data.cliente_ref instanceof DocumentReference ? data.cliente_ref.path : null,
          codigo_pedido: data.codigoPedido || null,
          data: data.data ? data.data.toDate().toISOString() : null,
          desconto_extra: data.descontoExtra || 0,
          desconto_extra_por_cento: data.descontoExtraPorCento || 0,
          desconto_total_db: data.descontoTotalDb || 0,
          desconto_total_por_cento: data.descontoTotalPorCento || 0,
          empresa_ref: data.empresa_ref instanceof DocumentReference ? data.empresa_ref.path : null,
          frete: data.frete || 0,
          observacao: data.observacao || null,
          origem_desconto: data.origem_desconto || null,
          representada_nome: data.representada_nome || null,
          representada_ref: data.representada_ref instanceof DocumentReference ? data.representada_ref.path : null,
          responsavel_nome: data.responsavel_nome || null,
          responsavel_ref: data.responsavel_ref instanceof DocumentReference ? data.responsavel_ref.path : null,
          status_pedido: data.statusPedido || null,
          subtotal_db: data.subtotalDb || 0,
          tipo_pedido: data.tipo_pedido || null,
          total_pedido: data.totalPedido || 0,
          transportadora_nome: data.transportadora_nome || null,
          transportadora_ref: data.transportadora_ref instanceof DocumentReference ? data.transportadora_ref.path : null,
          user_ref: data.user_ref instanceof DocumentReference ? data.user_ref.path : null,
          precos_e_pagamentos: precosEpagamentos,
          produtos_pedido: produtosPedido,
        };
      }));
      return pedidosList;
    },

    getPedido: async (_, { id }) => {
      try {
        const pedidoDoc = doc(db, 'pedidos', id);
        const pedidoSnapshot = await getDoc(pedidoDoc);

        if (!pedidoSnapshot.exists()) {
          throw new Error(`Pedido with ID ${id} not found.`);
        }

        const data = pedidoSnapshot.data();

        // Busca os preços e pagamentos associados ao pedido
        const precosEpagamentosCollection = collection(db, `pedidos/${id}/PrecosEpagamentos`);
        const precosSnapshot = await getDocs(precosEpagamentosCollection);
        const precosEpagamentos = precosSnapshot.docs.map(precoDoc => {
          const precoData = precoDoc.data();
          return {
            st: precoData.ST || 0,
            acrescimo_extra: precoData.acrescimo_extra || 0,
            acrescimo_geral: precoData.acrescimo_geral || 0,
            comissao_representante: precoData.comissao_representante || 0,
            comissao_vendedor: precoData.comissao_vendedor || 0,
            desconto_1: precoData.desconto_1 || 0,
            desconto_2: precoData.desconto_2 || 0,
            desconto_3: precoData.desconto_3 || 0,
            desconto_4: precoData.desconto_4 || 0,
            desconto_extra: precoData.desconto_extra || 0,
            frete: precoData.frete || 0,
            nome_prazo: precoData.nomePrazo || null,
            pedido_ref: precoData.pedido_ref instanceof DocumentReference ? precoData.pedido_ref.path : null,
            prazo_pagamento_data: precoData.prazo_pagamento_data ? precoData.prazo_pagamento_data.toDate().toISOString() : null,
            prazo_pagamento_dia: precoData.prazo_pagamento_dia || 0,
            tabela_preco_nome: precoData.tabela_preco_nome || null,
            tabela_preco_ref: precoData.tabela_preco_ref instanceof DocumentReference ? precoData.tabela_preco_ref.path : null,
          };
        })[0];

        // Busca os produtos associados ao pedido
        const produtosPedidoCollection = collection(db, `pedidos/${id}/ProdutosPedido`);
        const produtosSnapshot = await getDocs(produtosPedidoCollection);
        const produtosPedido = produtosSnapshot.docs.map(produtoDoc => {
          const produtoData = produtoDoc.data();
          return {
            codigo: produtoData.codigo || null,
            imagem: produtoData.imagem || null,
            ipi: produtoData.ipi || 0,
            nome: produtoData.nome || null,
            pedido_ref: produtoData.pedido_ref instanceof DocumentReference ? produtoData.pedido_ref.path : null,
            preco: produtoData.preco || 0,
            preco_liquido: produtoData.preco_liquido || 0,
            quantidade: produtoData.quantidade || 0,
            subtotal_liquido: produtoData.subtotal_liquido || 0,
            unidade: produtoData.unidade || null,
          };
        });

        return {
          id: pedidoSnapshot.id,
          acrescimo_total_db: data.acrescimoTotalDb || 0,
          acrescimo_total_por_cento: data.acrescimoTotalPorCento || 0,
          cliente_nome: data.cliente_nome || null,
          cliente_ref: data.cliente_ref instanceof DocumentReference ? data.cliente_ref.path : null,
          codigo_pedido: data.codigoPedido || null,
          data: data.data ? data.data.toDate().toISOString() : null,
          desconto_extra: data.descontoExtra || 0,
          desconto_extra_por_cento: data.descontoExtraPorCento || 0,
          desconto_total_db: data.descontoTotalDb || 0,
          desconto_total_por_cento: data.descontoTotalPorCento || 0,
          empresa_ref: data.empresa_ref instanceof DocumentReference ? data.empresa_ref.path : null,
          frete: data.frete || 0,
          observacao: data.observacao || null,
          origem_desconto: data.origem_desconto || null,
          representada_nome: data.representada_nome || null,
          representada_ref: data.representada_ref instanceof DocumentReference ? data.representada_ref.path : null,
          responsavel_nome: data.responsavel_nome || null,
          responsavel_ref: data.responsavel_ref instanceof DocumentReference ? data.responsavel_ref.path : null,
          status_pedido: data.statusPedido || null,
          subtotal_db: data.subtotalDb || 0,
          tipo_pedido: data.tipo_pedido || null,
          total_pedido: data.totalPedido || 0,
          transportadora_nome: data.transportadora_nome || null,
          transportadora_ref: data.transportadora_ref instanceof DocumentReference ? data.transportadora_ref.path : null,
          user_ref: data.user_ref instanceof DocumentReference ? data.user_ref.path : null,
          precos_e_pagamentos: precosEpagamentos,
          produtos_pedido: produtosPedido,
        };
      } catch (error) {
        console.error(`Error fetching pedido with ID ${id}:`, error.message);
        throw new Error('Failed to fetch pedido data.');
      }
    },

    getPedidosByEmpresa: async (_, { empresa_ref }) => {
      try {
        const empresaId = empresa_ref.includes("/") ? empresa_ref.split("/").pop() : empresa_ref;
        const empresaDocRef = doc(db, "Empresa", empresaId);
    
        const pedidosCollection = collection(db, "pedidos");
        const q = query(pedidosCollection, where("empresa_ref", "==", empresaDocRef));
        const pedidosSnapshot = await getDocs(q);
    
        if (pedidosSnapshot.empty) {
          console.warn(`Nenhum pedido encontrado para a empresa_ref: ${empresa_ref}`);
          return { pedidos: [], totaisPorTipo: [], metaAtual: null, pagamentos: [], calculos: {} };
        }
    
        const pedidosList = pedidosSnapshot.docs.map((doc) => {
          const data = doc.data();
          const processDocumentReference = (ref) => (ref ? ref.id || ref.path : null);
          return {
            id: doc.id || null,
            tipo_pedido: data.tipo_pedido || null,
            total_pedido: data.totalPedido || 0,
            representada_ref: processDocumentReference(data.representada_ref),
          };
        });
    
        const totaisPorTipo = pedidosList.reduce((acc, pedido) => {
          const tipo = pedido.tipo_pedido || "Outros";
          const total = pedido.total_pedido || 0;
          const existing = acc.find((t) => t.tipo === tipo);
          if (existing) {
            existing.total += total;
            existing.quantidade += 1;
          } else {
            acc.push({ tipo, total, quantidade: 1 });
          }
          return acc;
        }, []);
    
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    
        const representadaRef = pedidosList[0]?.representada_ref;
    
        if (!representadaRef) {
          console.warn("Nenhuma representada encontrada nos pedidos.");
          return {
            pedidos: pedidosList,
            totaisPorTipo,
            metaAtual: null,
            pagamentos: [],
            calculos: {},
          };
        }
    
        const pagamentosCollection = collection(db, `Representada/${representadaRef}/Pagamentos`);
        const pagamentosSnapshot = await getDocs(pagamentosCollection);
    
        let pagamentos = [];
        if (!pagamentosSnapshot.empty) {
          pagamentos = pagamentosSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id || null,
              regrComissaoRepresentante: data.RegrComissao_Representante || 0,
              regrComissaoVendedor: data.RegrComissao_Vendedor || 0,
            };
          });
        }
    
        const metaDocRef = doc(
          db,
          `Metas/${anoAtual}/Representadas/${representadaRef}/Meses/${mesAtual}`
        );
        const metaSnapshot = await getDoc(metaDocRef);
    
        let metaAtual = null;
        if (metaSnapshot.exists()) {
          const metas = metaSnapshot.data()?.metas || {};
          metaAtual = metas[mesAtual] || null;
        } else {
          console.warn("Documento de metas não encontrado para:", metaDocRef.path);
        }
    
        const propostas = pedidosList.filter((p) => p.tipo_pedido === "Orçamento");
        const vendas = pedidosList.filter((p) => p.tipo_pedido === "Venda");
    
        const valorMedioPropostas =
          propostas.length > 0
            ? propostas.reduce((acc, p) => acc + p.total_pedido, 0) / propostas.length
            : 0;
    
        const valorMedioVendas =
          vendas.length > 0
            ? vendas.reduce((acc, p) => acc + p.total_pedido, 0) / vendas.length
            : 0;
    
        const comissaoRepresentantePropostas = propostas.reduce(
          (acc, p) =>
            acc +
            (pagamentos.length > 0
              ? (p.total_pedido * pagamentos[0].regrComissaoRepresentante) / 100
              : 0),
          0
        );
    
        const comissaoRepresentanteVendas = vendas.reduce(
          (acc, p) =>
            acc +
            (pagamentos.length > 0
              ? (p.total_pedido * pagamentos[0].regrComissaoRepresentante) / 100
              : 0),
          0
        );
    
        const comissaoRepresentante = comissaoRepresentantePropostas + comissaoRepresentanteVendas;
    
        const comissaoVendedorPropostas = propostas.reduce(
          (acc, p) =>
            acc +
            (pagamentos.length > 0
              ? (p.total_pedido * pagamentos[0].regrComissaoVendedor) / 100
              : 0),
          0
        );
    
        const comissaoVendedorVendas = vendas.reduce(
          (acc, p) =>
            acc +
            (pagamentos.length > 0
              ? (p.total_pedido * pagamentos[0].regrComissaoVendedor) / 100
              : 0),
          0
        );
    
        const comissaoVendedor = comissaoVendedorPropostas + comissaoVendedorVendas;
    
        return {
          pedidos: pedidosList,
          totaisPorTipo,
          metaAtual,
          pagamentos,
          calculos: {
            valorMedioPropostas,
            valorMedioVendas,
            comissaoRepresentante,
            comissaoRepresentantePropostas,
            comissaoRepresentanteVendas,
            comissaoVendedor,
            comissaoVendedorPropostas,
            comissaoVendedorVendas,
          },
        };
      } catch (error) {
        console.error(`Erro ao buscar pedidos para empresa_ref ${empresa_ref}:`, error);
        throw new Error("Erro ao buscar pedidos.");
      }
    },

    getPedidosByEmpresaRef: async (_, { empresa_ref }) => {
      try {
        // Extrai o ID da empresa, caso seja um caminho completo
        const empresaId = empresa_ref.includes("/") ? empresa_ref.split("/").pop() : empresa_ref;
        const empresaDocRef = doc(db, "Empresa", empresaId);

        // Cria a query para buscar todos os pedidos com a empresa_ref correspondente
        const pedidosCollection = collection(db, "pedidos");
        const pedidosQuery = query(pedidosCollection, where("empresa_ref", "==", empresaDocRef));
        const pedidosSnapshot = await getDocs(pedidosQuery);

        if (pedidosSnapshot.empty) {
          return [];
        }

        // Processa os pedidos encontrados
        const pedidosList = await Promise.all(
          pedidosSnapshot.docs.map(async (pedidoDoc) => {
            const data = pedidoDoc.data();

            // Busca os preços e pagamentos associados ao pedido
            const precosEpagamentosCollection = collection(db, `pedidos/${pedidoDoc.id}/PrecosEpagamentos`);
            const precosSnapshot = await getDocs(precosEpagamentosCollection);
            const precosEpagamentos = precosSnapshot.docs.map((precoDoc) => {
              const precoData = precoDoc.data();
              return {
                st: precoData.ST || 0,
                acrescimo_extra: precoData.acrescimo_extra || 0,
                acrescimo_geral: precoData.acrescimo_geral || 0,
                comissao_representante: precoData.comissao_representante || 0,
                comissao_vendedor: precoData.comissao_vendedor || 0,
                desconto_1: precoData.desconto_1 || 0,
                desconto_2: precoData.desconto_2 || 0,
                desconto_3: precoData.desconto_3 || 0,
                desconto_4: precoData.desconto_4 || 0,
                desconto_extra: precoData.desconto_extra || 0,
                frete: precoData.frete || 0,
                nome_prazo: precoData.nomePrazo || null,
                pedido_ref: precoData.pedido_ref instanceof DocumentReference ? precoData.pedido_ref.path : null,
                prazo_pagamento_data: precoData.prazo_pagamento_data ? precoData.prazo_pagamento_data.toDate().toISOString() : null,
                prazo_pagamento_dia: precoData.prazo_pagamento_dia || 0,
                tabela_preco_nome: precoData.tabela_preco_nome || null,
                tabela_preco_ref: precoData.tabela_preco_ref instanceof DocumentReference ? precoData.tabela_preco_ref.path : null,
              };
            })[0]; // Assumindo que há apenas um documento em PrecosEpagamentos

            // Busca os produtos associados ao pedido
            const produtosPedidoCollection = collection(db, `pedidos/${pedidoDoc.id}/ProdutosPedido`);
            const produtosSnapshot = await getDocs(produtosPedidoCollection);
            const produtosPedido = produtosSnapshot.docs.map((produtoDoc) => {
              const produtoData = produtoDoc.data();
              return {
                codigo: produtoData.codigo || null,
                imagem: produtoData.imagem || null,
                ipi: produtoData.ipi || 0,
                nome: produtoData.nome || null,
                pedido_ref: produtoData.pedido_ref instanceof DocumentReference ? produtoData.pedido_ref.path : null,
                preco: produtoData.preco || 0,
                preco_liquido: produtoData.preco_liquido || 0,
                quantidade: produtoData.quantidade || 0,
                subtotal_liquido: produtoData.subtotal_liquido || 0,
                unidade: produtoData.unidade || null,
              };
            });

            return {
              id: pedidoDoc.id,
              acrescimo_total_db: data.acrescimoTotalDb || 0,
              acrescimo_total_por_cento: data.acrescimoTotalPorCento || 0,
              cliente_nome: data.cliente_nome || null,
              cliente_ref: data.cliente_ref instanceof DocumentReference ? data.cliente_ref.path : null,
              codigo_pedido: data.codigoPedido || null,
              data: data.data ? data.data.toDate().toISOString() : null,
              desconto_extra: data.descontoExtra || 0,
              desconto_extra_por_cento: data.descontoExtraPorCento || 0,
              desconto_total_db: data.descontoTotalDb || 0,
              desconto_total_por_cento: data.descontoTotalPorCento || 0,
              empresa_ref: data.empresa_ref instanceof DocumentReference ? data.empresa_ref.path : null,
              frete: data.frete || 0,
              observacao: data.observacao || null,
              origem_desconto: data.origem_desconto || null,
              representada_nome: data.representada_nome || null,
              representada_ref: data.representada_ref instanceof DocumentReference ? data.representada_ref.path : null,
              responsavel_nome: data.responsavel_nome || null,
              responsavel_ref: data.responsavel_ref instanceof DocumentReference ? data.responsavel_ref.path : null,
              status_pedido: data.statusPedido || null,
              subtotal_db: data.subtotalDb || 0,
              tipo_pedido: data.tipo_pedido || null,
              total_pedido: data.totalPedido || 0,
              transportadora_nome: data.transportadora_nome || null,
              transportadora_ref: data.transportadora_ref instanceof DocumentReference ? data.transportadora_ref.path : null,
              user_ref: data.user_ref instanceof DocumentReference ? data.user_ref.path : null,
              precos_e_pagamentos: precosEpagamentos,
              produtos_pedido: produtosPedido,
            };
          })
        );

        return pedidosList;
      } catch (error) {
        console.error(`Erro ao buscar pedidos para empresa_ref ${empresa_ref}:`, error.message);
        throw new Error("Erro ao buscar pedidos por empresa_ref.");
      }
    },
    
    getPedidosRelatorio: async (_, { empresa_ref, data }) => {
      try {   
        const empresaId = empresa_ref.includes("/") ? empresa_ref.split("/").pop() : empresa_ref;
        const empresaDocRef = doc(db, "Empresa", empresaId);
        console.log("Documento da empresa:", empresaDocRef.path);
    
        const pedidosCollection = collection(db, "pedidos");
        const pedidosQuery = query(pedidosCollection, where("empresa_ref", "==", empresaDocRef));
        const pedidosSnapshot = await getDocs(pedidosQuery);

        // Mapear os documentos da coleção
        const RepresentadaSnapshot = pedidosSnapshot.docs.map((doc) => ({
          id: doc.id, // Inclui o ID do documento
          ...doc.data(), // Inclui os dados do documento
        }));

        // Debug
        console.log('[Debug]........................................');
        
        let metaData;
        let representadaData;
        let metaClient;

        const metasCollectionQuery = collection(db, "Metas");
        const metaSnapshot = await getDocs(metasCollectionQuery);

        const metasSnapshot = metaSnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data(), 
        }));

        metasSnapshot.forEach((meta) => {
          metaData = meta.id
        })
        console.log('Metas: ',metaData );

        // 

        // Itera pelos pedidos para obter o ID da representada, se necessário
        RepresentadaSnapshot.forEach((pedido) => {
          const representadaId = pedido.representada_ref?.path.split("/").pop(); 
          representadaData = representadaId; 
        });

        // Função para obter o mês atual no formato "01", "02", ..., "12"
        function getMesAtual() {
          const dataAtual = new Date();
          // Adiciona 1 porque o JavaScript retorna meses de 0 (Janeiro) a 11 (Dezembro)
          const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
          return mesAtual;
        }

        // Parâmetros fixos
        const mesAtual = getMesAtual(); 
        const mesesCollectionPath = `Metas/${metaData}/Representadas/${representadaData}/Meses/${mesAtual}`;

        // Referência ao documento do mês
        const mesDocRef = doc(db, mesesCollectionPath);

        try {
          // Recupera o documento do mês específico
          const mesDocSnapshot = await getDoc(mesDocRef);

          if (mesDocSnapshot.exists()) {
            // Extrai os dados do documento
            const mesData = mesDocSnapshot.data();
            
            // Exibe os dados do mês atual
            metaClient = mesData.valor
            console.log("Meta encontrada", mesData.valor);
          } else {
            console.warn("Nenhum documento encontrado para o mês especificado.");
          }
        } catch (error) {
          // Trata possíveis erros na busca do documento
          console.error("Erro ao recuperar dados do mês:", error.message);
        }
        
        
        console.log('[Debug]........................................');
        
        const metasCollection = collection(db, "Metas");
        try {
          const metasSnapshot = await getDocs(metasCollection);
          const metas = metasSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          console.log("Metas encontradas2:", metas);
        } catch (error) {
          console.error("Erro ao buscar metas:", error);
        }
        
        console.log('[DEBUG] ..................Fim')

        if (pedidosSnapshot.empty) {
          console.warn("Nenhum pedido encontrado.");
          return {
            totalVendasDia: 0,
            totalPedidos: 0,
            totalVendas: 0,
            comissaoRepresentante: 0,
            comissaoVendedor: 0,
            metaAtual: metaClient,
            percentualMeta: 0,
            pedidos: [],
          };
        }
    
        console.log("Pedidos encontrados:", pedidosSnapshot.size);
    
        let totalVendasDia = 0;
        let totalVendas = 0;
        let comissaoRepresentante = 0;
        let comissaoVendedor = 0;
        let totalPropostas = 0;
    
        const pedidosList = await Promise.all(
          pedidosSnapshot.docs.map(async (pedidoDoc) => {
            const pedidoData = pedidoDoc.data();
    
            const convertDocumentReference = (ref) => (ref instanceof DocumentReference ? ref.path : null);
    
            const precosEpagamentos =
              pedidoData.precos_e_pagamentos || {}; // Trate valores nulos aqui
    
            // Incrementa os valores totais
            const totalPedido = pedidoData.totalPedido || 0;
            if (pedidoData.tipo_pedido === "Venda") {
              totalVendas += totalPedido;
            }
    
            // Calcula comissões
            const comissaoRepresentantePedido =
              (totalPedido * (precosEpagamentos.comissao_representante || 0)) / 100;
            const comissaoVendedorPedido =
              (totalPedido * (precosEpagamentos.comissao_vendedor || 0)) / 100;
    
            comissaoRepresentante += comissaoRepresentantePedido;
            comissaoVendedor += comissaoVendedorPedido;
    
            return {
              id: pedidoDoc.id,
              acrescimo_total_db: pedidoData.acrescimoTotalDb || 0,
              acrescimo_total_por_cento: pedidoData.acrescimoTotalPorCento || 0,
              cliente_nome: pedidoData.cliente_nome || null,
              cliente_ref: convertDocumentReference(pedidoData.cliente_ref),
              codigo_pedido: pedidoData.codigoPedido || null,
              data: pedidoData.data?.toDate().toISOString() || null,
              desconto_extra: pedidoData.descontoExtra || 0,
              desconto_extra_por_cento: pedidoData.descontoExtraPorCento || 0,
              desconto_total_db: pedidoData.descontoTotalDb || 0,
              desconto_total_por_cento: pedidoData.descontoTotalPorCento || 0,
              empresa_ref: convertDocumentReference(pedidoData.empresa_ref),
              frete: pedidoData.frete || 0,
              observacao: pedidoData.observacao || null,
              origem_desconto: pedidoData.origem_desconto || null,
              representada_nome: pedidoData.representada_nome || null,
              representada_ref: convertDocumentReference(pedidoData.representada_ref),
              responsavel_nome: pedidoData.responsavel_nome || null,
              responsavel_ref: convertDocumentReference(pedidoData.responsavel_ref),
              status_pedido: pedidoData.statusPedido || null,
              subtotal_db: pedidoData.subtotalDb || 0,
              tipo_pedido: pedidoData.tipo_pedido || null,
              total_pedido: totalPedido,
              transportadora_nome: pedidoData.transportadora_nome || null,
              transportadora_ref: convertDocumentReference(pedidoData.transportadora_ref),
              user_ref: convertDocumentReference(pedidoData.user_ref),
              precos_e_pagamentos: {
                st: precosEpagamentos.st || null,
                acrescimo_extra: precosEpagamentos.acrescimo_extra || null,
                acrescimo_geral: precosEpagamentos.acrescimo_geral || null,
                comissao_representante: precosEpagamentos.comissao_representante || null,
                comissao_vendedor: precosEpagamentos.comissao_vendedor || null,
                desconto_1: precosEpagamentos.desconto_1 || null,
                desconto_2: precosEpagamentos.desconto_2 || null,
                desconto_3: precosEpagamentos.desconto_3 || null,
                desconto_4: precosEpagamentos.desconto_4 || null,
                desconto_extra: precosEpagamentos.desconto_extra || null,
                frete: precosEpagamentos.frete || null,
                nome_prazo: precosEpagamentos.nomePrazo || null,
                pedido_ref: convertDocumentReference(precosEpagamentos.pedido_ref),
                prazo_pagamento_data: precosEpagamentos.prazo_pagamento_data
                  ? precosEpagamentos.prazo_pagamento_data.toDate().toISOString()
                  : null,
                prazo_pagamento_dia: precosEpagamentos.prazo_pagamento_dia || null,
                tabela_preco_nome: precosEpagamentos.tabela_preco_nome || null,
                tabela_preco_ref: convertDocumentReference(precosEpagamentos.tabela_preco_ref),
              },
              produtos_pedido: (await getDocs(collection(db, `pedidos/${pedidoDoc.id}/ProdutosPedido`))).docs.map(
                (produtoDoc) => {
                  const produtoData = produtoDoc.data();
                  return {
                    codigo: produtoData.codigo || null,
                    imagem: produtoData.imagem || null,
                    ipi: produtoData.ipi || 0,
                    nome: produtoData.nome || null,
                    pedido_ref: convertDocumentReference(produtoData.pedido_ref),
                    preco: produtoData.preco || 0,
                    preco_liquido: produtoData.preco_liquido || 0,
                    quantidade: produtoData.quantidade || 0,
                    subtotal_liquido: produtoData.subtotal_liquido || 0,
                    unidade: produtoData.unidade || null,
                  };
                }
              ),
            };
          })
        );
    
        console.log("Total de pedidos processados:", pedidosList.length);

        const percentMetaCurrent = ((totalVendas / metaClient) * 100).toFixed(2);

       // Comissões
        const pagamentosCollection = collection(db, `Representada/${representadaData}/Pagamentos`);
        const pagamentosSnapshot = await getDocs(pagamentosCollection);

        let pagamentos = [];
        if (!pagamentosSnapshot.empty) {
          pagamentos = pagamentosSnapshot.docs.map((doc) => {
            const data = doc.data();

            // Extração das comissões
            const regrComissaoRepresentante = data.RegrComissao_Representante || 0;
            const regrComissaoVendedor = data.RegrComissao_Vendedor || 0;

            if (pagamentos.length > 0) {
              const primeiroPagamento = pagamentos[0];
            } else {
              console.log("Nenhum pagamento encontrado.");
            }
            
            return {
              id: doc.id || null,
              regrComissaoRepresentante,
              regrComissaoVendedor,
            };
          });
        } else {
          console.log('Nenhum pagamento encontrado para a representada.');
        }

        // Para visualizar todos os pagamentos processados
        const regrComissaoRepresentante = pagamentos[0].regrComissaoRepresentante;
        const totalComissaoRepresentante = ((totalVendas * regrComissaoRepresentante) / 100 ).toFixed(2);
        console.log('A comissão do representante é: ', totalComissaoRepresentante);

        const regrComissaoVendedor = pagamentos[0].regrComissaoVendedor;
        const totalComissaoVendedor = ((totalVendas * regrComissaoVendedor) / 100 ).toFixed(2);
        console.log('A comissão do Vendedor é: ', totalComissaoVendedor);

        let totalPedido = 0;
        let resumoPedidos = []
        
        // Representada nome , valor vendido, meta 
        pedidosList.forEach((pedido) => {
          
          resumoPedidos.push({
            name: pedido.cliente_nome || "Cliente desconhecido", 
            status: pedido.status_pedido || "Status desconhecido", 
            valor: pedido.total_pedido || 0, 
          });

          console.log(pedido.produtos_pedido)

          console.log(pedido.cliente_nome)
          console.log(pedido.total_pedido)
          console.log(pedido.status_pedido)

          totalPedido += pedido.total_pedido || 0;
        });


        // pedido.total_pedido - metaClient
        console.log("Total dos pedidos:", totalPedido.toFixed(2));
        totalPropostas = totalPedido.toFixed(2);
    
        return {
          resumoPedidos: resumoPedidos,
          totalPropostas: totalPropostas,
          totalVendasDia,
          totalPedidos: pedidosList.length,
          totalVendas,
          comissaoRepresentante: totalComissaoRepresentante,
          comissaoVendedor: totalComissaoVendedor,
          metaAtual: metaClient,
          percentualMeta: percentMetaCurrent,
          pedidos: pedidosList,
        };
      } catch (error) {
        console.error("Erro crítico ao gerar relatório:", error.stack || error.message);
        throw new Error("Erro ao gerar relatório de pedidos.");
      }
    },

    getProgressMeta: async (_, { empresa_ref }) => {
      try {
        // Recupera o ID da empresa a partir do parâmetro empresa_ref
        const empresaId = empresa_ref.includes("/") ? empresa_ref.split("/").pop() : empresa_ref;
        const empresaDocRef = doc(db, "Empresa", empresaId);
        console.log("Documento da empresa:", empresaDocRef.path);
    
        // Consulta os pedidos relacionados à empresa
        const pedidosCollection = collection(db, "pedidos");
        const pedidosQuery = query(pedidosCollection, where("empresa_ref", "==", empresaDocRef));
        const pedidosSnapshot = await getDocs(pedidosQuery);
    
        if (pedidosSnapshot.empty) {
          console.warn("Nenhum pedido encontrado para a empresa.");
          return {
            pedidos: [],
          };
        }
    
        console.log("Pedidos encontrados:", pedidosSnapshot.size);
    
        // Processa os pedidos encontrados
        const pedidosList = await Promise.all(
          pedidosSnapshot.docs.map(async (pedidoDoc) => {
            const pedidoData = pedidoDoc.data();
    
            // Busca precos_e_pagamentos
            const precosEPagamentos = pedidoData.precos_e_pagamentos || {};
            console.log(pedidoData.descontoExtra);
            console.log(pedidoData);
    
            // Busca produtos_pedido
            const produtosPedidoCollection = collection(db, `pedidos/${pedidoDoc.id}/ProdutosPedido`);
            const produtosSnapshot = await getDocs(produtosPedidoCollection);
    
            const produtosPedido = produtosSnapshot.docs.map((produtoDoc) => {
              const produtoData = produtoDoc.data();
              return {
                codigo: produtoData.codigo || null,
                imagem: produtoData.imagem || null,
                ipi: produtoData.ipi || 0,
                nome: produtoData.nome || null,
                pedido_ref: produtoData.pedido_ref?.path || null,
                preco: produtoData.preco || 0,
                preco_liquido: produtoData.preco_liquido || 0,
                quantidade: produtoData.quantidade || 0,
                subtotal_liquido: produtoData.subtotal_liquido || 0,
                unidade: produtoData.unidade || null,
              };
            });
    
            return {
              id: pedidoDoc.id,
              cliente_nome: pedidoData.cliente_nome || null,
              data: pedidoData.data?.toDate().toISOString() || null,
              status_pedido: pedidoData.statusPedido || null,
              tipo_pedido: pedidoData.tipo_pedido || null,
              total_pedido: pedidoData.totalPedido || 0,
              precos_e_pagamentos: {
                st: precosEPagamentos.st || null,
                acrescimo_extra: precosEPagamentos.acrescimo_extra || null,
                acrescimo_geral: precosEPagamentos.acrescimo_geral || null,
                comissao_representante: precosEPagamentos.comissao_representante || null,
                comissao_vendedor: precosEPagamentos.comissao_vendedor || null,
                desconto_1: precosEPagamentos.desconto_1 || null,
                desconto_2: precosEPagamentos.desconto_2 || null,
                desconto_3: precosEPagamentos.desconto_3 || null,
                desconto_4: precosEPagamentos.desconto_4 || null,
                desconto_extra: precosEPagamentos.desconto_extra || null,
                frete: precosEPagamentos.frete || null,
                nome_prazo: precosEPagamentos.nomePrazo || null,
                pedido_ref: precosEPagamentos.pedido_ref?.path || null,
                prazo_pagamento_data: precosEPagamentos.prazo_pagamento_data
                  ? precosEPagamentos.prazo_pagamento_data.toDate().toISOString()
                  : null,
                prazo_pagamento_dia: precosEPagamentos.prazo_pagamento_dia || null,
                tabela_preco_nome: precosEPagamentos.tabela_preco_nome || null,
                tabela_preco_ref: precosEPagamentos.tabela_preco_ref?.path || null,
              },
              produtos_pedido: produtosPedido,
            };
          })
        );
    
        return {
          pedidos: pedidosList,
        };
      } catch (error) {
        console.error("Erro ao obter progresso da meta:", error.message);
        throw new Error("Erro ao obter progresso da meta.");
      }
    },
    
    // Relatorio Faturamento
    getRelatorioFaturamento: async (_, { empresa_ref }) => {
      try {
        // Recupera o ID da empresa a partir do parâmetro empresa_ref
        const empresaId = empresa_ref.includes("/") ? empresa_ref.split("/").pop() : empresa_ref;
        const empresaDocRef = doc(db, "Empresa", empresaId);
    
        // Consulta os pedidos relacionados à empresa
        const pedidosCollection = collection(db, "pedidos");
        const pedidosQuery = query(pedidosCollection, where("empresa_ref", "==", empresaDocRef));
        const pedidosSnapshot = await getDocs(pedidosQuery);


        // Pegando as Representantes
        let representadaRef;
        
        const metasData = await Promise.all(
          pedidosSnapshot.docs.map(async (debug) => {
            const debugData = debug.data();
        
            // Pega o ID de representada_ref
            representadaRef = debugData.representada_ref.id;

            // Obtém o mês atual
            const currentMonth = new Date().getMonth() + 1; 
            const currentMonthStr = currentMonth.toString(); 

            // Referência ao documento Representadas
            const representadaDocRef = doc(db, "Metas", "0jDXRAF2DNvfeB0z6YEo", "Representadas", representadaRef);

            // Referência ao documento do mês atual dentro de Meses
            const mesAtualDocRef = doc(representadaDocRef, "Meses", currentMonthStr);

            // Buscar dados do documento do mês atual
            const mesSnapshot = await getDoc(mesAtualDocRef);

            if (mesSnapshot.exists()) {
              const mesData = mesSnapshot.data();
              console.log(`Dados do mês ${currentMonthStr}:`, mesData.valor);
            } else {
              console.warn(`Documento para o mês ${currentMonthStr} não encontrado.`);
            }

          })
        );
        
        // Exibe os dados das metas
        //console.log("Dados das Metas:", metasValidas);
        
        
        // Consulta Meta Mensal
        if (pedidosSnapshot.empty) {
          console.warn("Nenhum pedido encontrado para a empresa.");
          return {
            pedidos: [],
            resumo: [
              {
                total_pedido: 0,
                total_venda: 0,
                total_orcamento: 0,
                vendas_hoje: 0,
                meta_mensal: 0,
                progresso_meta: null,
                comissao_faturada: 0,
                comissao_hoje: 0,
              },
            ],
          };
        }
    
        // Variáveis para cálculo do resumo
        let totalPedido = 0;
        let totalVenda = 0;
        let totalOrcamento = 0;
        let vendasHoje = 0; 
        let metaMensal = 0;
    
        const pedidosList = pedidosSnapshot.docs.map((pedidoDoc) => {
          const pedidoData = pedidoDoc.data();
          // Soma os totais
          totalPedido += pedidoData.totalPedido || 0;
          if (pedidoData.tipo_pedido === "Venda") {
            totalVenda += pedidoData.totalPedido || 0;
          } else if (pedidoData.tipo_pedido === "Orçamento") {
            totalOrcamento += pedidoData.totalPedido || 0;
          }
    
          // Lógica para vendas de hoje (exemplo com base em `data`)
          const dataPedido = pedidoData.data?.toDate();
          const hoje = new Date();
          if (
            dataPedido &&
            dataPedido.toDateString() === hoje.toDateString() &&
            pedidoData.tipo_pedido === "Venda"
          ) {
            vendasHoje += pedidoData.totalPedido || 0;
          }
    
          return {
            id: pedidoDoc.id,
            cliente_nome: pedidoData.cliente_nome || null,
            status_pedido: pedidoData.statusPedido || null,
            tipo_pedido: pedidoData.tipo_pedido || null,
          };
        });
    
        // Retorna pedidos e resumo
        return {
          pedidos: pedidosList,
          resumo: [
            {
              total_pedido: totalPedido,
              total_venda: totalVenda,
              total_orcamento: totalOrcamento,
              vendas_hoje: vendasHoje,
              meta_mensal: 1000000, 
              progresso_meta: `${((totalVenda / 1000000) * 100).toFixed(2)}%`, 
              comissao_faturada: totalVenda * 0.1, 
              comissao_hoje: vendasHoje * 0.1, 
            },
          ],
        };
      } catch (error) {
        console.error("Erro ao obter relatório de faturamento:", error.message);
        throw new Error("Erro ao obter relatório de faturamento.");
      }
    },
    
    
  },
};



