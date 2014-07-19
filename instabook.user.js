// ==UserScript==
// @name        Likely Likes
// @namespace   bsfb
// @include     https://www.facebook.com/MuthesiusKunsthochschule
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require  https://raw.githubusercontent.com/nyroDev/nyroModal/master/js/jquery.nyroModal.js
// @require  https://raw.githubusercontent.com/nyroDev/nyroModal/master/js/jquery.nyroModal.filters.link.js
// @require  https://raw.githubusercontent.com/nyroDev/nyroModal/master/js/jquery.nyroModal.filters.dom.js
// @resource nyroCSS https://raw.githubusercontent.com/nyroDev/nyroModal/master/styles/nyroModal.css
// @version     1
// @grant    GM_addStyle
// @grant    GM_getResourceText
// ==/UserScript==

(function () {
    var console = unsafeWindow.console,
        replies = [
            // 0:
            'SIIIIICK!!',
            'Wo bist du denn!?',
            'Meinst du das ernst?',
            '<span title=";)" class="emoticon emoticon_wink"></span>',
            '<span title="&lt;3" class="emoticon emoticon_heart"></span>',
            // 5:
            ':(((',
            'Warum?',
            'LOL',
            'Will auch!',
            'o_O',
            // 10:
            '^^',
            '<span title=":)" class="emoticon emoticon_smile"></span>',
            '<span title=":D" class="emoticon emoticon_grin"></span>',
            '<span title=":(" class="emoticon emoticon_frown"></span>',
            '<span title=":/" class="emoticon emoticon_unsure"></span>',
            // 15:
            '<span title="o.O" class="emoticon emoticon_confused"></span>',
            'Geilomat!! <span title=":D" class="emoticon emoticon_grin"></span>',
            'Echt jetzt!? <span title="o.O" class="emoticon emoticon_confused"></span>',
            'Denk an dich! <span title="&lt;3" class="emoticon emoticon_heart"></span>'],
        // These are trigger regexes and reply indices plus like modificators
        // don't define too many/complex triggers - performance impact ahead!
        triggers = [
            // Sad
            [/:-?[\/\\(]/, [1, 2, 4, 5, 6, 13, 14, 15, 18], 0],
            // Conspirative/happy
            [/[:;B]-?[D)]/, [1, 2, 3, 7, 8, 10, 11, 12, 16, 17], '+40'],
            // Event/mates/Jugendsprech
            [/\b(parth?e?y|mit|fett)\b/i, [0, 1, 3, 7, 8, 9, 15, 16], '+40'],
            // Location/thing
            [/\b(auf|in|bei|hier)\b/i, [0, 1, 8, 12, 15, 16, 17], '+20']],
        friends,
        likeTarget,
        maxComments = 7,
        modalContent = '<h1>So wird das nichts!</h1>'
            + '<img src="data:image/jpeg;base64,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">'
            + '<p>Der Post ist nicht so formuliert, dass eine ausreichend hohe Zahl an Likes erzielt werden würde.</p>'
            + '<p>Die Seite wird nun neu geladen, um Anderen eine Chance zu geben, es besser zu machen.</p>',
        modalCSS = '.ll-modal-cont{width:520px;height:230px;padding:35px 20px;font-size:1.3333em;line-height:1.4}'
            + '.ll-modal-cont h1{color:#3b5998;font-size:1.5em;line-height:1}'
            + '.ll-modal-cont img{display:block;float:right;margin: 1em 0 1.4em 1em;border:1px solid #bfc3cc}',
        commentHTML = '<div style="margin: 0px; width: 100%; border-top: 1px solid rgb(211, 214, 219); background-color: rgb(237, 239, 244); padding-top: 3px; padding-bottom: 3px;" class="fbTimelineUFI uiCommentContainer"><form id="u_ps_0_0_8" action="/ajax/ufi/modify.php" method="post" class="commentable_item autoexpand_mode" rel="async"><input type="hidden" value="€,´,€,´,水,Д,Є" name="charset_test"><input type="hidden" autocomplete="off" value="AQEaSOiSqJ3B" name="fb_dtsg"><input type="hidden" value="{&quot;actor&quot;:&quot;259752652346&quot;,&quot;target_fbid&quot;:&quot;10152431036507347&quot;,&quot;target_profile_id&quot;:&quot;259752652346&quot;,&quot;type_id&quot;:&quot;22&quot;,&quot;assoc_obj_id&quot;:&quot;&quot;,&quot;source_app_id&quot;:&quot;0&quot;,&quot;extra_story_params&quot;:[],&quot;content_timestamp&quot;:&quot;1402918124&quot;,&quot;check_hash&quot;:&quot;AQBBBQ3-9U2ik3nO&quot;,&quot;source&quot;:&quot;13&quot;}" name="feedback_params" autocomplete="off"><input type="hidden" value="1" name="data_only_response" autocomplete="off"><input type="hidden" value="1" name="timeline_ufi" autocomplete="off"><input type="hidden" value="AQDmNkbc0CT4Q1XiEn_YK0R42jhTXNDml_TtReiPw-YvZmbdyubXmn3uwPAKZplRFdGbVVPJm_x1w5JOlQa3xsbS-xW9QtJZ8_mcNAHNQSOWWjLq9Uor4K1bXr9iPmqqdIILWNLcnILaj_Q-UxxuWDNY8iYjaOum0atJtWHD3LIMuuRMR1-Ncx2qxUdZKQkjlbuo_OAWqraGpjUZaBaKMR7AvwlS-IRuRuNbY3O0-rYWq8neRlxT8sPBk1bpZn4Lge2VKJ_MKGeNpRG9njvhTqLSYJa6MsiFpcdbb2pn6EGoc3gqWRu7A7lp6o766buJbnGOJMAPxvzf6IbuxZBNwvIFs7FcZeuNC1Dr-UWGNh2rCJE-v2jJgfpkZKgNnTpfwt_1NEWX9xvXJ2pfwWxB_p9BShuOfYYCd5EQMIs48PrM6Q" name="timeline_log_data"><div><div id="u_ps_0_0_a" class="uiUfi UFIContainer"><ul class="UFIList"><li class="UFIRow UFILikeSentence UFIFirstComponent" style="display: list-item;"><div class="clearfix"><div class="_ohe lfloat"><a aria-label="Like this" role="button" title="Like this" tabindex="-1" href="#" class="img _8o _8r UFIImageBlockImage UFILikeThumb"><i class="UFILikeIcon"></i></a></div><div class=""><div class="UFIImageBlockContent _42ef _8u"><div class="UFILikeSentenceText"><span><a class="profileLink" href="">20 Personen</a><span> würde das gefallen.</span></span></div></div></div></div></li></ul></div></div></form></div>',
        commentRowHTML = '<li class="UFIRow UFIFirstComment UFIFirstCommentComponent UFIComment display UFIComponent"><div class="clearfix"><div class="_ohe lfloat"><a aria-hidden="true" tabindex="-1" href="https://www.facebook.com/Franzi.Kruse89?fref=ufi" class="img _8o _8s UFIImageBlockImage"><img alt="" class="img UFIActorImage _54ru" src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/p32x32/399984_528734033812449_1451271635_n.jpg"></a></div><div class=""><div class="clearfix UFIImageBlockContent _42ef"><div class="_ohf rfloat"><button tabindex="-1" title="Remove" class="_42ft _5upp _50zy _50-0 _50z- UFICommentCloseButtonFake" value="1" type="submit"><span>Remove</span></button></div><div class=""><div class="UFICommentContentBlock"><div class="UFICommentContent"><span><a href="https://www.facebook.com/Franzi.Kruse89?fref=ufi" dir="ltr" class="UFICommentActorName">Franzi Kruse</a></span><span> </span><span><span class="UFICommentBody"><span>Student*nnenwohnheim, ernsthaft? Lasst doch bitte die deutsche Sprache zufrieden, sie hat euch nichts getan.</span></span></span><span></span></div><div class="fsm fwn fcg UFICommentActions"><span><a href="/MuthesiusKunsthochschule/posts/10152423470497347?comment_id=10152423729657347&amp;offset=0&amp;total_comments=2" class="uiLinkSubtle"><abbr title="Friday, 13 June 2014 at 15:05" class="livetimestamp">13 June at 15:05</abbr></a></span></div></div></div></div></div></li>';
    
    function addComment($feedbackHolder, content) {
        var $comment = $(commentRowHTML),
            randomFriend,
            date;
        // Insert contents
        $comment.find('.UFICommentBody > span').html(content);
        // Make someone else say this
        // Friend list: https://www.facebook.com/browse/?type=page_fans&page_id=
        randomFriend = friends[Math.floor(Math.random() * friends.length)];
        $comment.find('img').attr('src', randomFriend.img)
            .parent().attr('href', randomFriend.href);
        $comment.find('.UFICommentActorName')
            .text(randomFriend.alt)
            .attr('href', randomFriend.href);
        // Set comment date/time
        // this is our reference:
        // <abbr title="Friday, 13 June 2014 at 15:05" class="livetimestamp">13 June at 15:05</abbr>
        date = new Date();
        $comment.find('.livetimestamp')
            .text(date.toLocaleString('de-DE', {
                day: 'numeric', month: 'long', hour: 'numeric',
                minute: 'numeric', hour12: false}))
            .attr('title', date.toLocaleString('de-DE', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                hour: 'numeric', minute: 'numeric', hour12: false}));
        // Append to comment listing
        $comment.insertAfter($feedbackHolder.find('.UFIList > li:last'));
        // If there are too many comments, delete older ones
        if ($feedbackHolder.find('.UFICommentBody').length > maxComments) {
            $feedbackHolder.find('.UFIList > li.UFIComment')
                .slice(0, -1 * maxComments).remove();
        }
    }
    
    function removeComment($feedbackHolder, removeAll) {
        if (true === removeAll) {
            // remove all comments
            $feedbackHolder.find('.UFIList > li.UFIComment').remove();
        } else {
            // remove last comment
            $feedbackHolder.find('.UFIList > li.UFIComment').eq(-1).remove();
        }
    }
    
    /**
     * Set like count (relative/absolute)
     *
     * @param mixed amount Absolute values (int) as well as relative: "+20" "-3"
     */
    function setLikes($feedbackHolder, amount) {
        var $likes = $feedbackHolder.find('.UFILikeSentenceText a'),
            likeCount,
            relativeAmount,
            newText,
            likeCounterCallback;
        
        likeCount = parseInt($likes.text(), 10);
        relativeAmount = /^([+\-*])\s*([\d.]+)/.exec(amount);
        if (null !== relativeAmount) {
            switch (relativeAmount[1]) {
                case '+':
                    likeCount += Math.floor(
                        parseInt(relativeAmount[2], 10)
                        * (Math.random() * (1.2 - 0.9) + 0.9)
                        + 1);
                    break;
                case '-':
                    likeCount -= Math.floor(
                        parseInt(relativeAmount[2], 10)
                        * (Math.random() * (1.2 - 0.9) + 0.9)
                        + 1);
                    break;
                case '*':
                    likeCount = Math.floor(likeCount * parseFloat(relativeAmount[2]));
            }
        } else {
            likeCount = amount;
        }
        likeCount = Math.max(0, likeCount);
        likeTarget = likeCount;
        if (undefined === likeCounterCallback) {
            likeCounterCallback = window.setInterval(
                function () {
                    var likeCount = parseInt($likes.text(), 10),
                        newText;
                    if (likeCount === likeTarget) {
                        // we have reached our target, callback is obsolete now
                        window.clearInterval(likeCounterCallback);
                        // debug
                        //console.log('removed ani interval');
                        likeCounterCallback = undefined;
                        /* this is not wanted anymore
                        if (likeCount === 0) {
                            $feedbackHolder.find('.UFILikeSentence').hide();
                        } else {
                            $feedbackHolder.find('.UFILikeSentence').show();
                        }
                        */
                        return;
                    }
                    likeCount += (likeTarget - likeCount > 0) ? 1 : -1;
                    newText = $likes.text().replace(/^\d+/, likeCount);
                    // debug
                    //console.log('Likes: ' + $likes.text() + ' > ' + newText);
                    $likes.text(newText);
                }, 50);
            // debug
            //console.log('added ani interval');
        }
    }
    
    function prepareFeedback() {
        var $feedback;
        $feedback = $(commentHTML).css({margin: 0, width: '100%',
            borderTop: '1px solid #D3D6DB', backgroundColor: '#EDEFF4',
            paddingTop: '3px', paddingBottom: '3px'});
        return $feedback;
    }

    // Do the magic
    function handleKeyUp() {
        var $feedback,
            hasFeedback,
            comment,
            $container,
            p;

        // This fn gets called 1sec after the user has typed something
        //console.log('Reacting in a clever way to "' + $(this).val() + '"');
        hasFeedback = $(this).data('hasFeedback');
        if ("" === $(this).val()) {
            // Nothing to feedback on
            if (hasFeedback) {
                // remove all comments
                removeComment($(this).data('feedback'), true);
                // and likes
                setLikes($(this).data('feedback'), 0);
            }
            return;
        }
        // Insert feedback node if none present
        if (hasFeedback) {
            $feedback = $(this).data('feedback');
        } else {
            $feedback = prepareFeedback();
            $container = $(this).closest('.child_is_active').parent();
            $feedback.appendTo($container).hide();
            $(this).data({hasFeedback: true, feedback: $feedback});
            // Scroll to make feedback visible
            p = $('html, body').animate({
                    scrollTop: $container.offset().top - 100}) // built-in compensation for fixed elements (e.g. smurf bar)
               .promise();
            // Also subtly animate feedback to direct attention
            p.always(function () {
                $feedback.fadeIn("slow");
            });
        }
        // TODO Fill feedback more than once/react to others' comments
        getComment($(this).val()).done(function (filteredReplies) {
            var content = ['', 0];
            if (filteredReplies.length === 1) {
                content = filteredReplies[0];
            } else {
                // Multiple valid replies, choose randomly
                content = filteredReplies[
                    Math.floor(Math.random() * filteredReplies.length)
                ];
            }
            addComment($feedback, content[0]);
            setLikes($feedback, content[1]);
        });
    }
    
    function decayFeedback() {
        var $feedback;
        $feedback = $(this).data('feedback');
        if (false == $feedback) {
            // falsy intented
            return;
        }
        removeComment($feedback);
        setLikes($feedback, '-2');
    }
    
    function handleKeyDown(e) {
        switch (e.keyCode) {
            case 8:
                // backspace
                // fall through
            case 46:
                // delete
                decayFeedback.call(e.target);
                break;
        }
    }
    
    function getComment(trigger) {
        var dfd = new $.Deferred();
        // This could be done async but we're not doing it here
        // may be replaced by server-side logic later
        (function (sentence) {
            var i, j, content = [], idx;
            for (i = 0; i < triggers.length; i++) {
                if (triggers[i][0].test(sentence)) {
                    for (j = 0; j < triggers[i][1].length; j++) {
                        content.push([replies[triggers[i][1][j]], triggers[i][2]]);
                    }
                }
            }
            if (content.length < 1) {
                // Could not make sense of it -> random reply
                i = Math.floor(Math.random() * triggers.length);
                content.push([
                    replies[triggers[
                        i][1][
                        Math.floor(Math.random() * triggers[i][1].length)]],
                    // But leave likes neutral, just to be sure
                    '*1']);
            }
            dfd.resolve(content);
        }(trigger));
        return dfd.promise();
    }
    
    function waitForUI() {
        // Add script to composer textarea
        waitForKeyElements('textarea[name=xhpc_message_text]', function (jNode) {
            var timeout;
            console.log('found fbTimelineComposerUnit:');
            console.log(jNode);
            // React to input (with timeout)
            jNode.eq(0).on('keyup', function (e) {
                if (timeout !== undefined) {
                    window.clearTimeout(timeout);
                }
                timeout = window.setTimeout(function () {
                    handleKeyUp.call(e.target);
                }, 1000);
            }).on('keydown', handleKeyDown);
            // Prevent users from posting fo' real
            jNode.parents('form')
                // Remove other event handlers
                .unbind('submit').off('submit').removeAttr('onsubmit')
                .attr('action', '//x')
                // Replace with own (showstopper)
                .on('submit', function (e) {
                    e.stopImmediatePropagation();
                    $.nmManual('#ll-modal', {
                        callbacks: {
                            'afterClose': function (nmObj) {
                                unsafeWindow.location.reload();
                            }}});
                    return false;
                });
        });
    }
    
    function getFriendList() {
        //http://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FMuthesiusKunsthochschule&width&height=290&colorscheme=light&show_faces=true&header=true&stream=false&show_border=true
        var promise;
        promise = $.get('https://www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FMuthesiusKunsthochschule&width&height=1000&colorscheme=light&show_faces=true&header=true&stream=false&show_border=true');
        promise.done(function (data) {
            friends = [];
            $("<div>").html(data).find(".pluginFacepile a").each(function () {
                friends.push({
                    img: this.firstChild.src, alt: this.title, href: this.href});
            });
            // debug
            //console.log('Found friends:');
            //console.log(friends);
        });
    }
    
    function prepareModal() {
        var nyroCSS = GM_getResourceText('nyroCSS');
        GM_addStyle(nyroCSS);
        GM_addStyle('.nyroModalBg{z-index:997}.nyroModalCont{z-index:998}.nyroModalClose{z-index:999}');
        GM_addStyle(modalCSS);
        $('<div id="ll-modal"><div class="ll-modal-cont">' + modalContent + '</div></div>')
            .appendTo('body').hide();
    }
    
    prepareFeedback();
    prepareModal();
    waitForUI();
    getFriendList();
}());