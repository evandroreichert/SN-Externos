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

// ================================
// FUNÇÕES UTILITÁRIAS
// ================================

function removerAcentosECaracteresEspeciais(str) {
    if (!str) return '';
    
    return MAPA_ACENTOS.reduce((texto, acento) => 
        texto.replace(acento.letras, acento.base), str);
}

function obterValorCampo(id, uppercase = true) {
    const elemento = document.getElementById(id);
    if (!elemento) return '';

    let valor = elemento.value || '';

    const valorSemAcentos = removerAcentosECaracteresEspeciais(valor);

    return uppercase ? valorSemAcentos.toUpperCase() : valorSemAcentos;
}

function valorOuPadrao(valor, padrao = '') {
    return valor || padrao;
}

// ================================
// COLETA E PROCESSAMENTO DE DADOS
// ================================

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
    let ficha = "*FICHA CADASTRAL CPF*\n\n";
    
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

// ================================
// INTERFACE E INTERAÇÃO
// ================================

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

function limparFormulario() {
    document.getElementById('cadastroForm').reset();
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = '';
    resultadoElement.style.display = "none";
    
    showToast('Formulário limpo!');
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show' + (isError ? ' error' : '');
    
    setTimeout(() => {
        toast.classList.remove('show', 'error');
    }, 3000);
}

// ================================
// SISTEMA DE TEMA
// ================================

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

// ================================
// FORMATAÇÃO AUTOMÁTICA DE CAMPOS
// ================================

function configurarFormatacaoAutomatica() {
    // CPF - apenas números, máximo 11 dígitos
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                e.target.value = value;
            }
        });
    }

    // CEP - apenas números, máximo 8 dígitos
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                e.target.value = value;
            }
        });
    }

    // Data de Nascimento - autocomplete com / (dd/mm/aaaa)
    const dataInput = document.getElementById('data_nascimento');
    if (dataInput) {
        dataInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número

            // Adiciona as barras automaticamente
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length >= 5) {
                value = value.substring(0, 5) + '/' + value.substring(5);
            }

            // Limita ao tamanho máximo (dd/mm/aaaa = 10 caracteres)
            if (value.length > 10) {
                value = value.substring(0, 10);
            }

            e.target.value = value;
        });

        // Adiciona validação ao sair do campo
        dataInput.addEventListener('blur', function(e) {
            const value = e.target.value;
            if (value && value.length === 10) {
                const partes = value.split('/');
                const dia = parseInt(partes[0]);
                const mes = parseInt(partes[1]);
                const ano = parseInt(partes[2]);

                // Validação básica
                if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900 || ano > new Date().getFullYear()) {
                    showToast('Data de nascimento inválida!', true);
                    e.target.value = '';
                }
            }
        });
    }

    // Telefones - apenas números, máximo 11 dígitos
    const telefoneIds = ['telefone_principal', 'telefone_recado', 'acompanhante_telefone'];
    telefoneIds.forEach(id => {
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
}

// ================================
// WIDGET DIÁRIO INTERATIVO
// ================================

function inicializarWidgetDiario() {
    const curiosidades = [
        "A internet global consome mais energia que a Argentina inteira! ⚡",
        "Um cabo submarino de fibra óptica pode transmitir 99% da velocidade da luz! 🌊",
        "O Brasil tem mais de 600 mil km de fibra óptica instalada - dá 15 voltas na Terra! 🇧🇷🌎",
        "1 minuto na internet = 500 horas de vídeos no YouTube enviados! 📹⏱️",
        "99% do tráfego de internet entre continentes passa por cabos submarinos! 🌊",
        "O primeiro email foi enviado em 1971 - antes do WhatsApp existir! 📧",
        "Uma única fibra óptica é mais fina que um fio de cabelo humano! 💇‍♀️",
        "O WiFi foi inventado por acidente enquanto estudavam buracos negros! 🕳️",
        "Google processa mais de 8,5 bilhões de pesquisas por dia! 🔍",
        "A deep web é 500x maior que a internet que conhecemos! 🕵️‍♂️",
        "Streaming de vídeo representa 60% de todo tráfego de internet! 🎬",
        "O ping para a Lua seria de 2,6 segundos (se tivesse WiFi lá)! 🌙",
        "Existem mais dispositivos conectados que pessoas no mundo! 📱",
        "TikTok consome mais dados que Netflix por minuto assistido! 📱",
        "A palavra 'spam' vem de uma marca de presunto enlatado! 🥫",
        "5,5 bilhões de pessoas usam internet - 68% da população mundial! 🌐",
        "241 milhões de novas pessoas entraram nas redes sociais em 2024! 📲",
        "96% dos adultos americanos usam internet - quase universal! 🇺🇸",
        "Fibra óptica é 10-20x mais rápida que cabos de 100MB tradicionais! ⚡",
        "Mais de 5 bilhões de km de fibra óptica já foram instalados no mundo! 🌍",
        "O cabo 2Africa tem 45.000km - conecta 3 continentes e 33 países! 🌍",
        "Fibra óptica aguenta -40°C a +70°C sem problemas! 🌡️",
        "28.000km de cabo FLAG equivalem a 14 viagens à Lua! 🚀",
        "Mônaco foi o 1º país com 100% cobertura de fibra óptica! 🇲🇨",
        "Mercado de fibra óptica vai de US$ 7,7bi para US$ 11,3bi até 2030! 💰",
        "Europa do Norte lidera com 99% de penetração de internet! 🇳🇴🥇",
        "660.000 novos usuários de redes sociais por dia em 2024! 📱",
        "Países ricos: 93% online vs países pobres: só 27%! 💰",
        "5G vai movimentar US$ 52 bilhões até 2028 graças à fibra! 📡",
        "XGS-PON oferece 10 Gbps simétricos - o futuro chegou! 🚀",
        "Fibras de múltiplos núcleos podem transmitir vários canais simultâneos! 🌈",
        "Fibras ocas (ar no lugar de vidro) são ainda mais rápidas! 💨",
        "DWDM permite múltiplos canais em uma única fibra! 📡",
        "Óptica quântica vai revolucionar comunicações seguras! 🔐",
        "EUA dominam 87,4% do mercado norte-americano de fibra! 🇺🇸📊",
        "Fibras flexíveis dobram sem perder sinal - perfeitas para medicina! 🏥🤸",
        "13 milhões de americanos ficaram online entre 2021-2023! 📈🇺",
        "Cabos de fibra suportam até 200 libras de tensão com kevlar! 💪",
        "Drones de fibra óptica são imunes a guerra eletrônica! 🛸",
        "Bell Labs bateu recorde: 100 petabit × km/s de transmissão! 🏆",
        "Internet cresceu 3,4% em 2024 - mais rápido que no ano passado! 📈",
        "5,22 bilhões usam redes sociais - 63,8% da população mundial! 📱",
        "Fibras quânticas vão permitir comunicação instantânea ultra-segura! ⚛️",
        "A guerra Rússia-Ucrânia usa drones de fibra desde março 2024! 🛸",
        "97 milhões de pessoas ficaram online pela primeira vez em 2023! 🆕",
        "Holanda, Noruega e Arábia Saudita têm 99% de penetração de internet! 🏆",
        "Cabo submarino pode durar 25 anos no fundo do oceano! 🌊",
        "Um único cabo de fibra pode carregar 10 terabits por segundo! 💾",
        "6G já está sendo planejado e vai precisar de ainda mais fibra! 📡",
        "Fibra óptica médica permite cirurgias menos invasivas! 🏥",
        "Cabos submarinos enfrentam tubarões que mordem pensando ser comida! 🦈",
        "Em 1 segundo, fibra óptica pode transmitir toda a Wikipédia em inglês 200x! 📚",
        "O primeiro cabo transatlântico de fibra óptica foi instalado em 1988! 🌊",
        "Fibra óptica funciona usando reflexão total interna da luz! 💡",
        "O núcleo de uma fibra monomodo tem apenas 9 micrômetros! 🔬",
        "Cada pulso de luz numa fibra representa milhares de bits! ✨",
        "Amplificadores ópticos podem amplificar luz sem converter em eletricidade! 🔋",
        "GPON permite até 128 usuários numa única fibra! 👥",
        "O índice de refração do vidro da fibra é cuidadosamente controlado! 🔧",
        "Splicing de fibra óptica é feito com arcos elétricos a 2000°C! 🔥",
        "WDM permite 160 canais de cores diferentes numa fibra! 🌈",
        "Fibras especiais podem detectar vibrações ao longo de 100km! 📡",
        "Redes ópticas passivas não precisam de energia elétrica no meio! ⚡",
        "O primeiro laser foi inventado em 1960, base da fibra óptica! 💫",
        "Fibras ópticas são imunes a interferência eletromagnética! 🛡️",
        "Cabo de fibra pode passar perto de transformadores sem problemas! ⚡",
        "Um único fio de fibra tem largura de banda de terahertz! 📊",
        "Dispersão cromática pode distorcer sinais em fibras longas! 🌈",
        "Conectores de fibra têm perdas menores que 0.3dB! 🔌",
        "Fibra óptica subaquática resiste à pressão de 1000 atmosferas! 🌊",
        "O primeiro sistema de fibra óptica comercial tinha 45Mbps! 📈",
        "Regeneradores ópticos podem amplificar sinais por 10.000km! 🔄",
        "Fibra óptica plástica é mais flexível mas perde mais sinal! 🧿",
        "Uma fibra pode transmitir 1 milhão de chamadas simultâneas! ☎️",
        "O coating de fibra protege contra micro-curvaturas! 🛡️",
        "Fusão de fibras cria união permanente átomo por átomo! ⚗️",
        "FTTx significa 'Fiber To The...' (casa, prédio, etc)! 🏠",
        "Brasil é 4º maior mercado mundial de fibra óptica! 🇧🇷🏆",
        "Cabo drop é a fibra que vai do poste até sua casa! 🏡",
        "CTO (Caixa Terminal Óptica) distribui fibras no seu bairro! 📦",
        "Splitter óptico divide 1 fibra em até 128 saídas! ↗️",
        "ONU/ONT é o equipamento que recebe fibra na sua casa! 📡",
        "PON usa apenas splitters passivos, sem energia! 🔌",
        "Fibra óptica não sofre com raios e tempestades! ⛈️",
        "OTDR testa fibras usando pulsos de luz e eco! 📏",
        "Emenda mecânica junta fibras em segundos! ⚡",
        "Cabo AD (Auto-Sustentado) não precisa de messenger! 🔗",
        "Fibra óptica começou com LEDs, hoje usa lasers! 💡",
        "O Brasil produz seus próprios cabos ópticos! 🏭",
        "Fibra tight-buffered é mais resistente ao manuseio! 💪",
        "Loose-tube protege fibras dentro de gel! 🧴",
        "Cabo ADSS aguenta ventos de até 200km/h! 💨",
        "Ultra High Density permite 1728 fibras num cabo! 📈",
        "Cabo micro permite passagem em dutos pequenos! 🔧",
        "Bend-insensitive reduz perdas em curvas apertadas! 🔄",
        "Cabo naval aguenta ancoras e correntes marítimas! ⚓",
        "Figura-8 é o cabo mais comum em postes brasileiros! 8️⃣",
        "Cordão óptico conecta equipamentos com flexibilidade! 🔌",
        "Pigtail é fibra com conector numa ponta só! 🐷",
        "DIO (Distribuidor Interno Óptico) organiza fibras! 📋",
        "Bastidor óptico pode ter centenas de conectores! 🗂️",
        "Fibra G.657 dobra mais sem perder sinal! 🤸",
        "NG-PON2 vai ter 40Gbps compartilhados! 🚀",
        "XG-PON já oferece 10Gbps para residências! 🏠",
        "Time-PON divide tempo entre usuários! ⏰",
        "Lambda-PON usa cores diferentes para cada usuário! 🌈",
        "Redes ópticas coerentes detectam até fase da luz! 🌊",
        "SDM (Space Division Multiplexing) usa múltiplos núcleos! 🎯",
        "Fibra cristal fotônico tem propriedades especiais! 💎",
        "Supercontinuum gera luz em todas as cores! 🌈",
        "Fibra dopada com érbio amplifica sinal diretamente! 🔋",
        "Efeito não-linear pode gerar novas frequências! ⚡",
        "Solitons são pulsos que viajam sem distorção! 🌊",
        "Efeito Kerr muda índice de refração com potência! 💡",
        "Espalhamento Raman pode amplificar sinais! 📡",
        "Birrefringência mantém polarização da luz! 🔄",
        "PMD (Dispersão por Modo de Polarização) distorce sinais! 📊",
        "Fibras especiais detectam temperatura ao longo do cabo! 🌡️",
        "DTS monitora temperatura em tempo real por 100km! 📏",
        "Sensores distribuídos usam própria fibra de comunicação! 📡",
        "Cabo óptico pode detectar vazamentos em oleodutos! 🛢️",
        "Fibra sente vibração de passos a quilômetros! 👣",
        "Interrogação óptica não precisa energia nos sensores! 🔋",
        "Cabo armado resiste à compressão de rochas! 🪨",
        "OPGW (Optical Ground Wire) protege linha de alta tensão! ⚡",
        "Cabo óptico pode substituir para-raios em torres! 🗼",
        "Fibra multimodo permite vários caminhos para luz! 🛤️",
        "Fibra monomodo força luz num único caminho! 1️⃣",
        "Step-index tem núcleo uniforme! ⚫",
        "Graded-index varia índice gradualmente! 📈",
        "Comprimento de onda 1550nm tem menor atenuação! 📏",
        "Janela de 1310nm tem zero dispersão! 🪟",
        "850nm é usado em fibras multimodo curtas! 💫",
        "Atenuação típica é 0.2dB/km em 1550nm! 📉",
        "Dispersão zero permite máxima velocidade! ⚡",
        "PMD afeta sinais acima de 10Gbps! 📊",
        "Nonlinear effects limitam potência óptica! ⚡",
        "Four Wave Mixing gera interferências! 🌊",
        "Cross Phase Modulation acopla canais WDM! 🔗",
        "Self Phase Modulation alarga pulsos! 📏",
        "Stimulated Brillouin Scattering limita potência! 💡",
        "Forward Error Correction corrige erros ópticos! ✅",
        "Digital Signal Processing melhora recepção! 💻",
        "Coherent detection permite mais sensibilidade! 📡",
        "DWDM Dense usa grade ITU de 50GHz! 📏",
        "C-band (1530-1565nm) tem mais canais WDM! 🌈",
        "L-band estende para 1565-1625nm! 📈",
        "EDFA (Erbium Doped) amplifica banda C! 🔋",
        "Raman amplification usa própria fibra! 💡",
        "ROADMs roteiam comprimentos de onda opticamente! 🛤️",
        "Optical cross-connects são switches ópticos gigantes! 🔄",
        "Photonic integrated circuits integram óptica em chips! 💻",
        "Silicon photonics usa tecnologia de processadores! 🖥️",
        "Planar lightwave circuits são roteadores ópticos! 🗺️",
        "MEMS mirrors direcionam feixes de luz! 🪞",
        "Liquid crystal switches modulam luz eletricamente! ⚡",
        "Acousto-optic switches usam ondas sonoras! 🔊",
        "Thermo-optic switches usam calor para chavear! 🔥",
        "Electroabsorption modulators controlam intensidade! 📊",
        "Mach-Zehnder modulators convertem dados elétricos! 🔄",
        "Photodiodes convertem luz de volta em eletricidade! 💡",
        "APD (Avalanche PhotoDiode) amplifica corrente! ⚡",
        "PIN diodes são detectores simples e eficientes! 📡",
        "MSA (Multi-Source Agreement) padroniza transceivers! 📋",
        "SFP+ suporta até 16Gbps em formato pequeno! 📦",
        "QSFP28 oferece 100Gbps em 4 canais! 🚀",
        "CFP modules chegam a 400Gbps! 🏎️",
        "Pluggable optics facilitam manutenção! 🔧",
        "Tunable lasers mudam comprimento de onda! 🎛️",
        "External cavity lasers têm precisão extrema! 🎯",
        "DFB lasers mantêm frequência estável! 📏",
        "VCSEL (Vertical Cavity) são eficientes para curta distância! 💡",
        "Quantum dot lasers prometem baixo consumo! ⚛️",
        "Mode-locked lasers geram pulsos ultracurtos! ⚡",
        "Superluminescent diodes têm largo espectro! 🌈",
        "Optical isolators previnem reflexões destrutivas! 🛡️",
        "Optical circulators direcionam luz unidirecionalmente! ↻",
        "Wavelength lockers mantêm laser na frequência certa! 🔒",
        "Attenuators reduzem potência óptica! 📉",
        "Dispersion compensation modules corrigem distorção! 🔧",
        "Optical time domain reflectometry mapeia fibras! 🗺️",
        "Bit error rate tester verifica qualidade do sinal! ✅",
        "Spectrum analyzer mostra potência por comprimento de onda! 📊",
        "Optical power meter mede intensidade luminosa! 📏",
        "Fiber identifier detecta tráfego sem desconectar! 🔍",
        "Visual fault locator usa laser vermelho para testes! 🔴",
        "Fusion splicer solda fibras com arco elétrico! ⚡",
        "Cleaver corta fibra no ângulo perfeito! ✂️",
        "Stripper remove coating sem danificar vidro! 🔧",
        "Microscope inspeciona faces de conectores! 🔬",
        "EndFace cleaner limpa sujeira dos conectores! 🧽"
    ];

    const dataDiaria = new Date();
    const seed = dataDiaria.getDate() + dataDiaria.getMonth() * 31 + dataDiaria.getFullYear() * 365;
    const curiosidadeIndex = seed % curiosidades.length;
    
    const widgetQuote = document.getElementById('dailyQuote');
    const widgetDate = document.getElementById('widgetDate');
    
    if (widgetQuote && widgetDate) {
        widgetQuote.textContent = curiosidades[curiosidadeIndex];
        
        const opcoes = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        widgetDate.textContent = dataDiaria.toLocaleDateString('pt-BR', opcoes);
    }
}

// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarWidgetDiario();
    configurarFormatacaoAutomatica();
    inicializarApp();
});