const TEMA_ESCURO = 'dark';
        const TEMA_CLARO = 'light';

        const MAPA_ACENTOS = [
            { base: 'A', letras: /[ÀÁÂÃÄ]/g },
            { base: 'E', letras: /[ÈÉÊË]/g },
            { base: 'I', letras: /[ÌÍÎÏ]/g },
            { base: 'O', letras: /[ÒÓÔÕÖ]/g },
            { base: 'U', letras: /[ÙÚÛÜ]/g },
            { base: 'C', letras: /[Ç]/g },
            { base: 'N', letras: /[Ñ]/g },
            { base: 'a', letras: /[àáâãä]/g },
            { base: 'e', letras: /[èéêë]/g },
            { base: 'i', letras: /[ìíîï]/g },
            { base: 'o', letras: /[òóôõö]/g },
            { base: 'u', letras: /[ùúûü]/g },
            { base: 'c', letras: /[ç]/g },
            { base: 'n', letras: /[ñ]/g }
        ];

        function removerAcentosECaracteresEspeciais(str) {
            if (!str) return '';
            
            return MAPA_ACENTOS.reduce((texto, acento) => 
                texto.replace(acento.letras, acento.base), str);
        }

        function obterValorCampo(id, uppercase = true) {
            const elemento = document.getElementById(id);
            if (!elemento) return '';
            
            const valor = elemento.value || '';
            const valorSemAcentos = removerAcentosECaracteresEspeciais(valor);
            
            return uppercase ? valorSemAcentos.toUpperCase() : valorSemAcentos;
        }

        function valorOuPadrao(valor, padrao = '') {
            return valor || padrao;
        }

        function coletarDadosFormulario() {
            const dados = {
                tipo_instalacao: obterValorCampo('tipo_instalacao'),
                cpf: obterValorCampo('cpf', false),
                data_nascimento: obterValorCampo('data_nascimento', false),
                nome_completo: obterValorCampo('nome_completo'),
                rg: obterValorCampo('rg'),
                email: obterValorCampo('email', false),
                como_soube: obterValorCampo('como_soube'),
                cep: obterValorCampo('cep', false),
                endereco_completo: obterValorCampo('endereco_completo'),
                referencia_completa: obterValorCampo('referencia_completa'),
                bairro: obterValorCampo('bairro'),
                telefone_principal: obterValorCampo('telefone_principal', false),
                telefone_recado: obterValorCampo('telefone_recado', false),
                plano_escolhido: obterValorCampo('plano_escolhido'),
                vencimento_mensalidade: obterValorCampo('vencimento_mensalidade'),
                taxa_instalacao: obterValorCampo('taxa_instalacao'),
                forma_pagto: obterValorCampo('forma_pagto'),
                acompanhante_nome: obterValorCampo('acompanhante_nome'),
                acompanhante_telefone: obterValorCampo('acompanhante_telefone', false),
                servico_adicional: obterValorCampo('servico_adicional'),
                observacoes: obterValorCampo('observacoes'),
                vendedora: obterValorCampo('vendedora')
            };
            return dados;
        }

        function gerarTextoFicha(dados) {
            let ficha = "**FICHA CADASTRAL CPF**\n\n";
            
            // Tipo de instalação
            ficha += `INSTALAÇÃO (SERVIÇO QUE VAI SER FEITO): ${dados.tipo_instalacao}\n\n`;
            
            // Dados pessoais
            ficha += `CPF: ${dados.cpf}\n`;
            ficha += `DATA DE NASCIMENTO: ${dados.data_nascimento}\n`;
            ficha += `NOME COMPLETO: ${dados.nome_completo}\n`;
            ficha += `RG: ${dados.rg}\n`;
            ficha += `EMAIL: ${dados.email}\n\n`;
            
            // Como soube
            if (dados.como_soube) {
                ficha += `COMO VOCÊ FICOU SABENDO DA SN? ${dados.como_soube}\n`;
            }
            
            // Endereço
            ficha += `CEP: ${dados.cep}\n`;
            ficha += `ENDEREÇO COMPLETO: ${dados.endereco_completo}\n`;
            ficha += `REFERÊNCIA COMPLETA: ${dados.referencia_completa}\n`;
            ficha += `BAIRRO: ${dados.bairro}\n\n`;
            
            // Telefones
            ficha += `TELEFONE PRINCIPAL: ${dados.telefone_principal}\n`;
            ficha += `TELEFONE PARA RECADO: ${dados.telefone_recado}\n\n`;
            
            // Plano e pagamento
            ficha += `PLANO ESCOLHIDO: ${dados.plano_escolhido}\n`;
            ficha += `VENCIMENTO DA MENSALIDADE: ${dados.vencimento_mensalidade}\n`;
            
            if (dados.taxa_instalacao) {
                ficha += `TAXA DE INSTALAÇÃO E FORMA DE PAGAMENTO: ${dados.taxa_instalacao}\n`;
            }
            
            ficha += `FORMA DE PAGTO MENSALIDADE: ${dados.forma_pagto}\n\n`;
            
            // Acompanhante
            if (dados.acompanhante_nome || dados.acompanhante_telefone) {
                ficha += `QUEM VAI ACOMPANHAR A INSTALAÇÃO:\n`;
                if (dados.acompanhante_nome) {
                    ficha += `NOME: ${dados.acompanhante_nome}\n`;
                }
                if (dados.acompanhante_telefone) {
                    ficha += `TELEFONE: ${dados.acompanhante_telefone}\n`;
                }
                ficha += `\n`;
            }
            
            // Serviço adicional
            if (dados.servico_adicional) {
                ficha += `SERVIÇO ADICIONAL: ${dados.servico_adicional}\n`;
            }
            
            // Observações
            if (dados.observacoes) {
                ficha += `OBSERVAÇÕES PARA ORDEM DE SERVIÇO: ${dados.observacoes}\n`;
            }
            
            // Vendedora
            if (dados.vendedora) {
                ficha += `VENDEDORA: ${dados.vendedora}\n`;
            }
            
            return ficha;
        }

        function exibirFicha(textoFicha) {
            const resultadoElement = document.getElementById('resultado');
            resultadoElement.textContent = textoFicha;
            resultadoElement.style.display = "block";
        }

        async function copiarParaAreaDeTransferencia(texto) {
            try {
                await navigator.clipboard.writeText(texto);
                return true;
            } catch (erro) {
                console.error('Erro ao copiar:', erro);
                return false;
            }
        }

        // Função para gerar a ficha
        async function gerarFicha() {
            const dados = coletarDadosFormulario();
            const textoFicha = gerarTextoFicha(dados);
            
            exibirFicha(textoFicha);
            
            const sucessoCopia = await copiarParaAreaDeTransferencia(textoFicha);
            
            if (sucessoCopia) {
                showToast('Ficha copiada para a área de transferência!');
            } else {
                showToast('Erro ao copiar ficha!', true);
            }
        }
        
        // Função para limpar formulário
        function limparFormulario() {
            document.getElementById('cadastroForm').reset();
            const resultadoElement = document.getElementById('resultado');
            resultadoElement.textContent = '';
            resultadoElement.style.display = "none";
            
            showToast('Formulário limpo!');
        }
        
        // Função para mostrar toast
        function showToast(message, isError = false) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = 'toast show' + (isError ? ' error' : '');
            
            setTimeout(() => {
                toast.classList.remove('show', 'error');
            }, 3000);
        }

        function configurarTema(modoClaro) {
            const logo = document.getElementById("logo");
            const themeLabel = document.getElementById("themeLabel");
            
            if (modoClaro) {
                document.body.classList.add("light-mode");
                themeLabel.textContent = "Light Mode";
                logo.src = "assets/light-logo.png";
                localStorage.setItem("theme", TEMA_CLARO);
            } else {
                document.body.classList.remove("light-mode");
                themeLabel.textContent = "Dark Mode";
                logo.src = "assets/dark-logo.png";
                localStorage.setItem("theme", TEMA_ESCURO);
            }
        }

        function inicializarApp() {
            const themeToggle = document.getElementById("themeToggle");
            const savedTheme = localStorage.getItem("theme") || TEMA_ESCURO;
            
            configurarTema(savedTheme === TEMA_CLARO);
            themeToggle.checked = savedTheme === TEMA_CLARO;
            
            themeToggle.addEventListener("change", function() {
                configurarTema(themeToggle.checked);
            });
        }
        
        // Formatação automática de CPF
        document.addEventListener('DOMContentLoaded', function() {
            // CPF
            const cpfInput = document.getElementById('cpf');
            if (cpfInput) {
                cpfInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 11) {
                        e.target.value = value;
                    }
                });
            }
            
            // CEP
            const cepInput = document.getElementById('cep');
            if (cepInput) {
                cepInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 8) {
                        e.target.value = value;
                    }
                });
            }
            
            // Telefones
            ['telefone_principal', 'telefone_recado', 'acompanhante_telefone'].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('input', function(e) {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 11) {
                            e.target.value = value;
                        }
                    });
                }
            });

            // Inicializar tema
            inicializarApp();
        });