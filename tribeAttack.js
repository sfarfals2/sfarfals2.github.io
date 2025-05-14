// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'tribePlayersUnderAttack',
        name: 'Tribe Players Under Attack',
        version: 'v1.3.1', // Versão atualizada para refletir a mudança de storage
        author: 'RedAlert + Custom',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/tribe-players-under-attack-tribe-leader.287111/',
    },
    translations: {
        en_DK: {
            'Tribe Players Under Attack': 'Tribe Players Under Attack',
            Help: 'Help',
            'Error fetching player incomings!':
                'Error fetching player incomings!',
            Village: 'Village',
            Support: 'Support',
            'Villages under attack:': 'Villages under attack:',
            'No player is under attack!': 'No player is under attack!',
            'Player Name': 'Player Name',
            Incomings: 'Incomings',
            'Incs/Village Under Attack:': 'Incs/Village Under Attack:',
            'Incs/Total Village:': 'Incs/Total Village:',
            'There was an error!': 'There was an error!',
            'Configure Discord Webhook': 'Configure Discord Webhook (Current Session)', // Texto atualizado
            'Enter your Discord Webhook URL for this session:': 'Enter your Discord Webhook URL for this session:', // Texto atualizado
            'Discord Webhook URL set for current session.': 'Discord Webhook URL set for current session.', // Texto atualizado
            'Discord Webhook URL cleared for current session.': 'Discord Webhook URL cleared for current session.', // Texto atualizado
            'No Discord Webhook URL entered.': 'No Discord Webhook URL entered.',
            'Discord Webhook URL is not set. Notifications will not be sent.': 'Discord Webhook URL is not set. Notifications will not be sent.',
             'Error sending Discord Webhook.': 'Error sending Discord Webhook.',
             'Current Discord Webhook URL:\n': 'Current Discord Webhook URL:\n',
             '\nEnter a new URL or leave blank to clear for this session:': '\nEnter a new URL or leave blank to clear for this session:', // Texto atualizado
        },
        fr_FR: {
             'Tribe Players Under Attack': 'Joueur tribu sous attaque',
            Help: 'Aide',
            'Error fetching player incomings!':
                'Erreur chargement ordres entrants!',
            Village: 'Village',
            Support: 'Support',
            'No player is under attack!': 'Aucun joueur sous attaque!',
            'Player Name': 'Pseudo du joueur',
            Incomings: 'Entrants',
            'Incs/Village Under Attack:': 'Ordres/Village sous Attaque:',
            'Incs/Total Village:': 'Ordres/Total Village:',
            'There was an error!': 'Oupsi il y a eu une erreur!',
             'Configure Discord Webhook': 'Configurer Webhook Discord (Session Actuelle)',
            'Enter your Discord Webhook URL for this session:': 'Entrez l\'URL de votre Webhook Discord pour cette session:',
            'Discord Webhook URL set for current session.': 'URL du Webhook Discord définie pour la session actuelle.',
            'Discord Webhook URL cleared for current session.': 'URL du Webhook Discord effacée pour la session actuelle.',
            'No Discord Webhook URL entered.': 'Aucune URL de Webhook Discord n\'a été saisie.',
            'Discord Webhook URL is not set. Notifications will not be sent.': 'L\'URL du Webhook Discord n\'est pas définie. Les notifications ne seront pas envoyées.',
             'Error sending Discord Webhook.': 'Erreur lors de l\'envoi du Webhook Discord.',
             'Current Discord Webhook URL:\n': 'URL actuelle du Webhook Discord:\n',
             '\nEnter a new URL or leave blank to clear for this session:': '\nEntrez une nouvelle URL ou laissez vide pour effacer pour cette session:',
        },
        br_BR: {
            'Tribe Players Under Attack': 'Jogadores da tribo sobre ataque',
            Help: 'Ajuda',
            'Error fetching player incomings!':
                'Erro ao buscar dados dos jogadores!',
            Village: 'Aldeia',
            Support: 'Suporte',
            'No player is under attack!': 'Nenhum jogador sobre ataque!',
            'Player Name': 'Nome do jogador',
            Incomings: 'Entradas',
            'Incs/Village Under Attack:': 'Comandos/Aldeias sobre ataque:',
            'Incs/Total Village:': 'Comandos/Total das aldeias:',
            'There was an error!': 'Ops! Houve um erro!',
            'Configure Discord Webhook': 'Configurar Webhook Discord (Sessão Atual)',
            'Enter your Discord Webhook URL for this session:': 'Digite a URL do seu Webhook Discord para esta sessão:',
            'Discord Webhook URL set for current session.': 'URL do Webhook Discord definida para a sessão atual.',
            'Discord Webhook URL cleared for current session.': 'URL do Webhook Discord limpa para a sessão atual.',
            'No Discord Webhook URL entered.': 'Nenhuma URL do Webhook Discord foi digitada.',
            'Discord Webhook URL is not set. Notifications will not be sent.': 'A URL do Webhook Discord não está configurada. As notificações não serão enviadas.',
             'Error sending Discord Webhook.': 'Erro ao enviar Webhook Discord.',
             'Current Discord Webhook URL:\n': 'URL atual do Webhook Discord:\n',
             '\nEnter a new URL or leave blank to clear for this session:': '\nDigite uma nova URL ou deixe em branco para limpar para esta sessão:',
        },
         // Adiciona mais idiomas conforme necessário
    },
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    isDebug: DEBUG,
    enableCountApi: true,
};

// --- Variável de memória para o URL do Webhook Discord ---
let discordWebhookUrlInMemory = "https://discord.com/api/webhooks/1372261732055122001/GjwY_waRo73EB73btatdSqpukCrY9vEKOL8Ify9NjY-VVu9J2SxH5htwOSCPycQ58Fkv";

// --- Funções para Webhook Discord (agora usam a variável de memória) ---

// Envia uma mensagem para o webhook do Discord
function sendDiscordWebhook(message) {
    // Usa a variável de memória diretamente
    if (!discordWebhookUrlInMemory) {
        console.warn(twSDK.tt('Discord Webhook URL is not set. Notifications will not be sent.'));
        return;
    }

    jQuery.ajax({
        type: 'POST',
        url: discordWebhookUrlInMemory, // Usa a variável
        contentType: 'application/json',
        data: JSON.stringify({ content: message }),
        success: function() {
            console.log('Webhook Discord enviado com sucesso.');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(`${twSDK.scriptInfo()} ${twSDK.tt('Error sending Discord Webhook.')}`, textStatus, errorThrown, jqXHR.responseText);
            // Opcional: mostrar um erro na UI, mas pode ser spam se houver muitos erros
            // UI.ErrorMessage(twSDK.tt('Error sending Discord Webhook.'));
        }
    });
}

// Adiciona UI para configurar o webhook (agora apenas para a sessão atual)
function addWebhookSettingsUI() {
     const settingsHtml = `
         <div style="margin-top: 10px; text-align: center;">
             <a href="#" id="ra-discord-webhook-settings" class="btn">${twSDK.tt('Configure Discord Webhook')}</a>
         </div>
     `;
     // Anexa ao final do widget principal
     jQuery('#ra-tribe-players-under-attack').append(settingsHtml);

     jQuery('#ra-discord-webhook-settings').on('click', function(e) {
         e.preventDefault();
         // Usa a variável de memória para obter o URL atual da sessão
         const currentUrl = discordWebhookUrlInMemory;
         const promptText = currentUrl
             ? twSDK.tt('Current Discord Webhook URL:\n') + currentUrl + twSDK.tt('\nEnter a new URL or leave blank to clear for this session:')
             : twSDK.tt('Enter your Discord Webhook URL for this session:');

         UI.Prompt(
             promptText,
             currentUrl || '', // Valor padrão
             twSDK.tt('Configure Discord Webhook'), // Título da janela
             function(newUrl) { // Callback ao clicar em OK
                 if (newUrl && newUrl.trim() !== '') {
                     discordWebhookUrlInMemory = newUrl.trim(); // Salva na variável de memória
                     UI.SuccessMessage(twSDK.tt('Discord Webhook URL set for current session.'));
                 } else if (currentUrl) {
                     // Usuário deixou em branco e havia uma URL anterior na memória, então limpamos
                     discordWebhookUrlInMemory = null; // Limpa a variável de memória
                     UI.SuccessMessage(twSDK.tt('Discord Webhook URL cleared for current session.'));
                 } else {
                      // Usuário deixou em branco e não havia URL anterior na memória
                      UI.InfoMessage(twSDK.tt('No Discord Webhook URL entered.'));
                 }
             }
             // Não precisamos de callback para Cancelar, apenas fecha
         );
     });
}


// --- Início da Lógica Principal do Script (dentro do callback $.getScript) ---

$.getScript(
    `https://twscripts.dev/scripts/twSDK.js?url=${document.currentScript.src}`,
    async function () {
        // Initialize Library
        await twSDK.init(scriptConfig);
        const scriptInfo = twSDK.scriptInfo();

        // Nova função principal para lidar com a configuração inicial do webhook
        async function scriptMain() {
             // Renderiza um placeholder primeiro para anexar a UI de configuração
            twSDK.renderBoxWidget('', 'raTribePlayersUnderAttack', 'ra-tribe-players-under-attack', '');
            addWebhookSettingsUI(); // Adiciona o link de configuração (agora apenas para a sessão)

             // *** PROMPT PARA O URL DO WEBHOOK CADA VEZ QUE O SCRIPT CORRE ***
             UI.Prompt(
                twSDK.tt('Enter your Discord Webhook URL for this session:'),
                '',
                twSDK.tt('Configure Discord Webhook'),
                function(newUrl) { // Callback on OK
                    if (newUrl && newUrl.trim() !== '') {
                        discordWebhookUrlInMemory = newUrl.trim(); // Salva na variável de memória
                        UI.SuccessMessage(twSDK.tt('Discord Webhook URL set for current session.'));
                         // Agora inicia a lógica principal de busca e renderização
                        initTribePlayersUnderAttack();
                    } else {
                        UI.InfoMessage(twSDK.tt('No Discord Webhook URL entered.'));
                        UI.InfoMessage(twSDK.tt('Discord Webhook URL is not set. Notifications will not be sent.'));
                         // Inicia a lógica principal sem webhook configurado
                        initTribePlayersUnderAttack();
                    }
                },
                function() { // Callback on Cancel
                    UI.InfoMessage(twSDK.tt('No Discord Webhook URL entered.'));
                    UI.InfoMessage(twSDK.tt('Discord Webhook URL is not set. Notifications will not be sent.'));
                     // Inicia a lógica principal sem webhook configurado
                    initTribePlayersUnderAttack();
                }
            );
            // *** FIM DO PROMPT CADA VEZ ***
        }


        // initTribePlayersUnderAttack(); // Chamada original - REMOVEMOS ESTA
        scriptMain(); // <-- Chamamos a nova função principal


        // Script Business Logic
        async function initTribePlayersUnderAttack() {
            // Resto da lógica para obter e processar dados...
            // Esta função é chamada APÓS o usuário configurar (ou cancelar) o prompt do webhook.

            const playersToFetch = await getTribeMembersList(); // Tenta obter a lista de líder

            if (playersToFetch.length) { // Modo Líder / members_defense
                const playersData = [...playersToFetch];
                const coordsRegex = twSDK.coordsRegex;
                const memberUrls = playersToFetch.map((item) => item.url);

                // Show progress bar and notify user
                twSDK.startProgressBar(memberUrls.length);

                twSDK.getAll(
                    memberUrls,
                    function (index, data) { // Callback de sucesso para cada jogador
                        twSDK.updateProgressBar(index, memberUrls.length);

                        const htmlDoc = jQuery.parseHTML(data);
                        const villagesTableRows = jQuery(htmlDoc)
                            .find(`.table-responsive table tr`)
                            .not(':first');
                        const totalPlayerVillagesCount =
                            villagesTableRows.length;

                        const villageIncs = []; // Entradas para ESTE jogador específico

                        // parse player information
                        if (villagesTableRows && villagesTableRows.length) {
                            villagesTableRows.each(function () {
                                try {
                                    const _this = jQuery(this);
                                    const incomingsCount = parseInt(
                                        _this.find('td:last').text().trim()
                                    );

                                    if (incomingsCount > 0) { // <-- Ataque detetado nesta aldeia!
                                        const currentVillageId = parseInt(
                                            twSDK.getParameterByName(
                                                'id',
                                                window.location.origin +
                                                    _this
                                                        .find('td:first a')
                                                        .attr('href')
                                            )
                                        );
                                        const currentVillageNameFull = _this
                                            .find('td:first')
                                            .text()
                                            .trim();
                                        const currentVillageNameClean = currentVillageNameFull.replace(coordsRegex, '').trim(); // Apenas o nome
                                        const currentVillageCoords = currentVillageNameFull.match(coordsRegex)[0]; // Apenas as coordenadas

                                        // --- Enviar Webhook para esta aldeia ---
                                        // Agora sendDiscordWebhook() usa a variável global/de escopo discordWebhookUrlInMemory
                                        const playerName = playersData[index].name;
                                        const localTime = new Date().toLocaleString();
                                        const server = game_data.world; // Obtém o mundo atual

                                        const webhookMessage = `🚨 [${server}] Jogador ${playerName} sob ataque na aldeia ${currentVillageNameClean} (${currentVillageCoords})! ${incomingsCount} incomings. (Detectado: ${localTime})`;

                                        sendDiscordWebhook(webhookMessage); // Envia a mensagem para o webhook
                                        // ------------------------------------


                                        // Continuar a recolher dados para a tabela
                                        let villageData = [];

                                        _this
                                            .find('td')
                                            .not(':first')
                                            .not(':last')
                                             .not(':eq(0)')
                                            .each(function (index, element) {
                                                const unitAmount =
                                                    jQuery(this)
                                                        .text()
                                                        .trim() !== '?'
                                                        ? jQuery(this)
                                                              .text()
                                                              .trim()
                                                        : 0;
                                                villageData.push(unitAmount);
                                            });

                                         let villageTroops = {};
                                         const relevantUnits = game_data.units.filter(unit => unit !== 'militia');
                                         relevantUnits.forEach(
                                             (unit, unitIndex) => {
                                                villageTroops[unit] = parseInt(villageData[unitIndex]) || 0;
                                             }
                                         );


                                        villageIncs.push({
                                            villageId: currentVillageId,
                                            villageName: currentVillageNameFull,
                                            villageCoords: currentVillageCoords,
                                            incsCount: incomingsCount,
                                            troops: villageTroops,
                                        });
                                    }
                                } catch (error) {
                                    UI.ErrorMessage(
                                        twSDK.tt(
                                            'Error fetching player incomings!'
                                        )
                                    );
                                    console.error(
                                        `${scriptInfo} Error:`,
                                        error
                                    );
                                }
                            });
                        }

                        let totalIncs = villageIncs.map(
                            (incoming) => incoming.incsCount
                        );
                        totalIncs = parseInt(
                            twSDK.sumOfArrayItemValues(totalIncs)
                        );

                        // update players info
                        playersData[index] = {
                            ...playersData[index],
                            incomings: villageIncs,
                            totalPlayerVillages: Math.ceil(
                                totalPlayerVillagesCount / 2
                            ),
                            villagesUnderAttack: villageIncs.length,
                            totalIncomingsNumber: totalIncs,
                        };
                    },
                    function () { // Callback de sucesso quando TODOS os pedidos estão completos
                        if (DEBUG) {
                            console.debug(
                                `${scriptInfo} playersData`,
                                playersData
                            );
                        }

                        try {
                             const playersUnderAttack = playersData.filter(p => p.villagesUnderAttack > 0);

                            const playerIncomingsTable =
                                buildPlayerIncomingsTable(playersUnderAttack);

                            const customStyle = `
                                .ra-player-incomings { margin-bottom: 10px; border: 1px solid #7d510f; }
                                .ra-player-incomings:last-child { margin-bottom: 0; }
                                .ra-player-incomings h3 { user-select: none; font-weight: normal; margin: 0; padding: 5px; font-size: 14px; background-color: #cfb278 !important; position: relative; cursor: pointer; }
                                .ra-toggle-icon { float: right; }
                                .ra-player-incomings-table { display: none; padding: 5px; }
                                .ra-table th { background-color: #d2b170 !important; background-image: none !important; }
                                .ra-tal { text-align: left; }
                            `;

                             twSDK.updateBoxWidget( // Usa update pois o placeholder já foi criado
                                playerIncomingsTable,
                                'raTribePlayersUnderAttack',
                                'ra-tribe-players-under-attack',
                                customStyle
                             );


                            // init action handlers (agora aplicados ao conteúdo renderizado)
                            togglePlayerExpandableWidget();
                            handleClickMassSupport();

                        } catch (error) {
                            UI.ErrorMessage(twSDK.tt('There was an error!'));
                            console.error(`${scriptInfo} Error:`, error);
                        }
                    },
                    function () { // Callback de erro geral
                        UI.ErrorMessage(
                            twSDK.tt('Error fetching player incomings!')
                        );
                         // Limpa o widget placeholder e mostra erro
                         twSDK.updateBoxWidget(
                              `<p>${twSDK.tt('Error fetching player incomings!')}</p>`,
                             'raTribePlayersUnderAttack',
                             'ra-tribe-players-under-attack',
                              ''
                         );
                    }
                );
            } else { // Modo Membro Comum / members_troops
                 // Verifica se a página atual é members_troops
                 if (game_data.screen === 'ally' && (game_data.mode === 'members_troops' || game_data.mode === 'members_defense')) { // Verifica ambos os modos caso o getMembersList falhe antes
                         const tribeMembers = await getTribeMembersListNotLeader();

                         const tribeMembersData = [...tribeMembers];
                         const tribeMemberUrls = tribeMembers.map(
                             (item) => item.url
                         );

                         // Show progress bar and notify user
                         twSDK.startProgressBar(tribeMemberUrls.length);

                         twSDK.getAll(
                             tribeMemberUrls,
                             function (index, data) { // Callback de sucesso para cada jogador
                                 twSDK.updateProgressBar(
                                     index,
                                     tribeMemberUrls.length
                                 );

                                 const htmlDoc = jQuery.parseHTML(data);
                                 let incomingsCountElement = jQuery(htmlDoc)
                                     .find(
                                         `.table-responsive table tr:first th:last`
                                     );

                                 let incomingsCount = 0;
                                 let incsShown = tribeMembersData[index].incsShown; // Usa a informação já obtida

                                 if(incomingsCountElement.length && incsShown) {
                                     const text = incomingsCountElement.text().trim();
                                     const match = text.match(/\((\d+)\)/);
                                      incomingsCount = match ? parseInt(match[1]) : 0;
                                 } else if (incomingsCountElement.length && !incsShown) {
                                      // Se não partilha, o jogo pode mostrar 0 ou ?, mas a flag incsShown indica a não partilha
                                      incomingsCount = 0; // Representamos como 0 incomings contáveis, a UI mostrará '?'
                                 } else {
                                      // Elemento não encontrado - pode ser um erro ou estrutura inesperada
                                      console.warn(`${scriptInfo} Não encontrou o elemento de incomings para o jogador ${tribeMembersData[index].name}.`);
                                      incomingsCount = 0;
                                      incsShown = false; // Assume que não partilhou ou houve erro
                                 }


                                 tribeMembersData[index] = {
                                     ...tribeMembersData[index],
                                     incomings: incomingsCount,
                                     incsShown: incsShown, // Atualiza a flag caso a análise tenha mudado
                                 };
                             },
                             function () { // Callback de sucesso quando TODOS os pedidos estão completos
                                 if (DEBUG) {
                                     console.debug(
                                         `${scriptInfo} tribeMembersData`,
                                         tribeMembersData
                                     );
                                 }

                                 try {
                                     let dialogContent = `
                                         <div class="ra-popup-content ra-mb15">
                                             <table class="ra-table vis" width="100%">
                                                 <thead>
                                                     <tr>
                                                         <th class="ra-tal">
                                                             ${twSDK.tt(
                                                                 'Player Name'
                                                             )}
                                                         </th>
                                                         <th>
                                                             ${twSDK.tt('Incomings')}
                                                         </th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                     `;

                                     // Filtra e ordena jogadores
                                     const playersWhoHaveShared = tribeMembersData
                                         .filter(
                                             (tribeMember) => tribeMember.incsShown
                                         )
                                         .sort((a, b) => b.incomings - a.incomings);

                                     const playersWhoHaveNotShared =
                                         tribeMembersData.filter(
                                             (tribeMember) => !tribeMember.incsShown
                                         );

                                     const tribeMembersList = [
                                         ...playersWhoHaveShared,
                                         ...playersWhoHaveNotShared,
                                     ];

                                      // Re-ordenar apenas para garantir
                                     tribeMembersList.sort((a, b) => {
                                         if (a.incsShown && !b.incsShown) return -1;
                                         if (!a.incsShown && b.incsShown) return 1;
                                         if (a.incsShown && b.incsShown) return b.incomings - a.incomings;
                                         return 0;
                                     });


                                     tribeMembersList.forEach((tribeMember) => {
                                         const { id, name, incomings, incsShown } =
                                             tribeMember;
                                         const className = incsShown
                                             ? ''
                                             : 'incs-shown-disabled';

                                         dialogContent += `
                                             <tr class="${className}">
                                                 <td class="ra-tal">
                                                     <a href="/game.php?screen=info_player&id=${id}" target="_blank" rel="noopener noreferrer">
                                                         ${twSDK.cleanString(name)}
                                                     </a>
                                                 </td>
                                                 <td>${incsShown ? twSDK.formatAsNumber(incomings) : '?'}</td>
                                             </tr>
                                         `;
                                     });

                                     dialogContent += `</tbody></table></div>`;

                                     const customStyle = `
                                         .incs-shown-disabled td { opacity: 0.5; }
                                         .ra-tal { text-align: left; }
                                     `;

                                      twSDK.updateBoxWidget( // Usa update
                                         dialogContent,
                                         'raTribePlayersUnderAttack',
                                         'ra-tribe-players-under-attack',
                                         customStyle
                                     );

                                 } catch (error) {
                                     console.error(`${scriptInfo} Error:`, error);
                                     UI.ErrorMessage(twSDK.tt('There was an error!'));
                                 }
                             },
                             function () { // Callback de erro geral
                                 UI.ErrorMessage(
                                     twSDK.tt('Error fetching player incomings!')
                                 );
                                  // Limpa o widget placeholder e mostra erro
                                   twSDK.updateBoxWidget(
                                        `<p>${twSDK.tt('Error fetching player incomings!')}</p>`,
                                       'raTribePlayersUnderAttack',
                                       'ra-tribe-players-under-attack',
                                        ''
                                   );
                             }
                         );
                    } else {
                         // Se o jogador não tiver permissões para members_troops/defense
                          const noPermissionContent = `
                               <div class="ra-popup-content ra-mb15">
                                   <p>${twSDK.tt('Error fetching player incomings!')}</p>
                                   <p>(${twSDK.tt('Requires tribe permissions for members_troops or members_defense.')})</p>
                               </div>
                          `;
                           twSDK.updateBoxWidget( // Usa update
                                noPermissionContent,
                                'raTribePlayersUnderAttack',
                                'ra-tribe-players-under-attack',
                                ''
                           );
                    }

            }
        }

        // Render: Build the player incomings table (Modo Líder)
        function buildPlayerIncomingsTable(playerIncomings) {
             // Se não houver jogadores sob ataque (após filtrar), mostramos a mensagem
             if (playerIncomings.length === 0) {
                 return `<b>${twSDK.tt('No player is under attack!')}</b>`;
             }

            let playerIncomingsList = ``;

            // Ordena jogadores pelo número total de incomings (descendente)
            playerIncomings.sort(
                (a, b) => b.totalIncomingsNumber - a.totalIncomingsNumber
            );

            playerIncomings.forEach((player) => {
                const {
                    id,
                    incomings,
                    name,
                    totalIncomingsNumber,
                    totalPlayerVillages,
                    villagesUnderAttack,
                } = player;

                if (incomings.length > 0) {
                    const incomingsTable =
                        buildSinglePlayerIncomingsTable(incomings);
                    const totalIncs =
                        twSDK.formatAsNumber(totalIncomingsNumber);
                    const villagesUnderAttackCount =
                        twSDK.formatAsNumber(villagesUnderAttack);

                     const incomingsPerVillageUnderAttackRatio = villagesUnderAttack > 0 ? parseFloat(
                         totalIncomingsNumber / villagesUnderAttack
                     ).toFixed(2) : 'N/A';
                     const incomingsPerTotalVillageRatio = totalPlayerVillages > 0 ? parseFloat(
                         totalIncomingsNumber / totalPlayerVillages
                     ).toFixed(2) : 'N/A';


                    playerIncomingsList += `
                        <div class='ra-player-incomings'>
                            <h3 class="ra-player-incomings-toggle">
                                <a href='/game.php?screen=info_player&id=${id}' target='_blank' rel='noopener noreferrer'>
                                    ${twSDK.cleanString(name)}
                                </a> <b>(${villagesUnderAttackCount}/${twSDK.formatAsNumber(
                        totalPlayerVillages
                    )})</b>
                                - ${twSDK.tt(
                                    'Incomings'
                                )}: <b>${totalIncs}</b> - ${twSDK.tt(
                                    'Incs/Village Under Attack:'
                                )} <b>${incomingsPerVillageUnderAttackRatio}</b> - ${twSDK.tt(
                                    'Incs/Total Village:'
                                )} <b>${incomingsPerTotalVillageRatio}</b>
                                <span class="ra-toggle-icon">
                                    <img src="/graphic/plus.png">
                                </span>
                            </h3>
                            <div class="ra-player-incomings-table">
                                ${incomingsTable}
                            </div>
                        </div>
                    `;
                }
            });

            return playerIncomingsList;
        }

        // Render: Build the incomings table for a single player (Modo Líder)
        function buildSinglePlayerIncomingsTable(incomings) {
            let troopsHead = '';
             const relevantUnits = game_data.units.filter(unit => unit !== 'militia');
             relevantUnits.forEach((unit) => {
                  troopsHead += `<th width="${Math.floor(50 / relevantUnits.length)}%"><img src="/graphic/unit/unit_${unit}.png"></th>`;
             });


            let incomingsTable = `
                <table class="ra-table" width="100%">
                    <thead>
                        <tr>
                            <th width="20%">
                                ${twSDK.tt('Village')}
                            </th>
                            <th width="7%">
                                <img src="/graphic/unit/att.png">
                            </th>
                            ${troopsHead}
                            <th widh="7%">
                                ${twSDK.tt('Support')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // sort player incomings on villages by the village which has the most incomings
            incomings.sort((a, b) => {
                return b.incsCount - a.incsCount;
            });

            incomings.forEach((incoming) => {
                const { incsCount, troops, villageName, villageId } = incoming;
                 const villageTroopsHtml = buildVillageTroops(troops);
                const supportUrl = `${game_data.link_base_pure}place&mode=call&target=${villageId}&village=${game_data.village.id}`; // Link de suporte

                incomingsTable += `
                    <tr>
                        <td class="ra-tal">
                            <a href="/game.php?screen=info_village&id=${villageId}" target="_blank" rel="noopener noreferrer">
                                ${villageName}
                            </a>
                        </td>
                        <td>
                            ${twSDK.formatAsNumber(incsCount)}
                        </td>
                        ${villageTroopsHtml}
                        <td>
                            <a href="${supportUrl}" class="btn ra-ask-support-btn" target="_blank" rel="noopener noreferrer">
                                ${twSDK.tt('Support')}
                            </a>
                        </td>
                    </tr>
                `;
            });

            incomingsTable += `</tbody></table>`;

            return incomingsTable;
        }

        // Render: Build village troops HTML for table row (Modo Líder)
        function buildVillageTroops(troops) {
            let villageTroopsHtml = ``;
             const relevantUnits = game_data.units.filter(unit => unit !== 'militia');
             relevantUnits.forEach((unit) => {
                  villageTroopsHtml += `
                     <td>
                         ${twSDK.formatAsNumber(troops[unit] || 0)}
                     </td>
                 `;
             });
            return villageTroopsHtml;
        }

        // Helper: Fetch players list (Modo Líder)
        async function getTribeMembersList() {
            let troopsMemberPage =
                '/game.php?village=' +
                game_data.village.id +
                '&screen=ally&mode=members_defense';
            if (game_data.player.sitter != '0') {
                troopsMemberPage += '&t=' + game_data.player.id;
            }

            try {
                const response = await jQuery.get(troopsMemberPage);
                const options = jQuery(response).find(
                    '.input-nicer option:not([disabled])'
                );

                 const playerSelect = jQuery(response).find('.input-nicer');
                 if (!playerSelect.length || options.length === 0) {
                     console.log(`${scriptInfo} Não tem permissões para members_defense. Tentando members_troops.`);
                     return [];
                 }

                const membersToFetch = [];

                options.map(function (_, option) {
                    let url =
                        '/game.php?screen=ally&mode=members_defense&player_id=' +
                        option.value +
                        '&village=' +
                        game_data.village.id;
                    if (game_data.player.sitter != '0') {
                        url += '&t=' + game_data.player.id;
                    }
                    if (!isNaN(parseInt(option.value))) {
                        membersToFetch.push({
                            url: url,
                            id: parseInt(option.value),
                            name: twSDK.cleanString(option.text),
                        });
                    }
                });

                return membersToFetch;

            } catch (error) {
                 console.error(`${scriptInfo} Erro ao buscar a página members_defense:`, error);
                 console.log(`${scriptInfo} Tentando members_troops como fallback.`);
                 return [];
            }
        }

        // Helper: Fetch players list when you are not a tribe leader (Modo Membro Comum)
        async function getTribeMembersListNotLeader() {
            let troopsMemberPage =
                '/game.php?village=' +
                game_data.village.id +
                '&screen=ally&mode=members_troops';
            if (game_data.player.sitter != '0') {
                troopsMemberPage += '&t=' + game_data.player.id;
            }

             try {
                const response = await jQuery.get(troopsMemberPage);
                const options = jQuery(response).find('.input-nicer option');

                 const playerSelect = jQuery(response).find('.input-nicer');
                  if (!playerSelect.length || options.length === 0) {
                      console.error(`${scriptInfo} Não tem permissões para members_troops.`);
                     return [];
                 }

                const membersToFetch = [];

                options.map(function (_, option) {
                    let url =
                        '/game.php?screen=ally&mode=members_troops&player_id=' +
                        option.value +
                        '&village=' +
                        game_data.village.id;

                    if (game_data.player.sitter != '0') {
                        url += '&t=' + game_data.player.id;
                    }
                    if (!isNaN(parseInt(option.value))) {
                        membersToFetch.push({
                            url: url,
                            id: parseInt(option.value),
                            name: twSDK.cleanString(option.text),
                            incsShown: !jQuery(option).is(':disabled'),
                        });
                    }
                });

                return membersToFetch;
             } catch (error) {
                  console.error(`${scriptInfo} Erro ao buscar a página members_troops:`, error);
                  return [];
             }
        }

        // Action Handler: Toggle player expandable widget
        function togglePlayerExpandableWidget() {
            jQuery('.ra-player-incomings-toggle').on('click', function (event) { // Captura o evento
                 // Verifica se o clique não foi no link do nome do jogador (para abrir a info page)
                 if (!jQuery(event.target).is('a')) {
                    jQuery(this)
                        .parent()
                        .find('.ra-player-incomings-table')
                        .slideToggle(50);

                    const toggleIcon = jQuery(this).find('.ra-toggle-icon img');
                    const toggleIconSrc = jQuery(toggleIcon).attr('src');
                    if (toggleIconSrc.includes('/graphic/minus.png')) {
                        jQuery(toggleIcon).attr('src', '/graphic/plus.png');
                    } else {
                        jQuery(toggleIcon).attr('src', '/graphic/minus.png');
                    }
                 }
            });
        }

        // Action Handler: Handle click of mass support button
        function handleClickMassSupport() {
            jQuery('#ra-tribe-players-under-attack .ra-ask-support-btn').on('click', function () {
                jQuery(this).addClass('btn-confirm-yes');
            });
        }

        // --- Chama a nova função principal para iniciar o script ---
        scriptMain();
    }
);
