// ==UserScript==
// @name        fbdialogolego
// @namespace   bsfb
// @include     https://www.facebook.com/MuthesiusKunsthochschule
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     1
// @grant    GM_addStyle
// ==/UserScript==

(function () {
    var console = unsafeWindow.console,
        replies = ['SIIIIICK!!', 'Wo bist du denn!?', 'Meinst du das ernst?',
                   '<span title=";)" class="emoticon emoticon_wink"></span>',
                   '<span title="&lt;3" class="emoticon emoticon_heart"></span>',
                   ':(((', 'Warum?', 'LOL', 'Will auch!', 'o_O', '^^',
                   '<span title=":)" class="emoticon emoticon_smile"></span>',
                   '<span title=":D" class="emoticon emoticon_grin"></span>',
                   '<span title=":(" class="emoticon emoticon_frown"></span>',
                   '<span title=":/" class="emoticon emoticon_unsure"></span>',
                   '<span title="o.O" class="emoticon emoticon_confused"></span>'],
        // These are trigger regexes and reply indices
        // don't define too many/complex triggers - performance impact ahead!
        triggers = [
            // Sad
            [/:-?[\/\\(]/, [1, 2, 4, 5, 6, 13, 14, 15]],
            // Conspirative/happy
            [/[:;B]-?[D)]/, [1, 2, 3, 7, 8, 10, 11, 12]],
            // Event/mates/Jugendsprech
            [/\b(parth?e?y|mit|fett)\b/i, [0, 1, 3, 7, 8, 9, 15]],
            // Location/thing
            [/\b(auf|in|bei)\b/i, [1, 8, 15, 12]]
        ],
        friends,
        commentHTML = '<div style="margin: 0px; width: 100%; border-top: 1px solid rgb(211, 214, 219); background-color: rgb(237, 239, 244); padding-top: 3px; padding-bottom: 3px;" class="fbTimelineUFI uiCommentContainer"><form id="u_ps_0_0_8" action="/ajax/ufi/modify.php" method="post" class="commentable_item autoexpand_mode" rel="async"><input type="hidden" value="€,´,€,´,水,Д,Є" name="charset_test"><input type="hidden" autocomplete="off" value="AQEaSOiSqJ3B" name="fb_dtsg"><input type="hidden" value="{&quot;actor&quot;:&quot;259752652346&quot;,&quot;target_fbid&quot;:&quot;10152431036507347&quot;,&quot;target_profile_id&quot;:&quot;259752652346&quot;,&quot;type_id&quot;:&quot;22&quot;,&quot;assoc_obj_id&quot;:&quot;&quot;,&quot;source_app_id&quot;:&quot;0&quot;,&quot;extra_story_params&quot;:[],&quot;content_timestamp&quot;:&quot;1402918124&quot;,&quot;check_hash&quot;:&quot;AQBBBQ3-9U2ik3nO&quot;,&quot;source&quot;:&quot;13&quot;}" name="feedback_params" autocomplete="off"><input type="hidden" value="1" name="data_only_response" autocomplete="off"><input type="hidden" value="1" name="timeline_ufi" autocomplete="off"><input type="hidden" value="AQDmNkbc0CT4Q1XiEn_YK0R42jhTXNDml_TtReiPw-YvZmbdyubXmn3uwPAKZplRFdGbVVPJm_x1w5JOlQa3xsbS-xW9QtJZ8_mcNAHNQSOWWjLq9Uor4K1bXr9iPmqqdIILWNLcnILaj_Q-UxxuWDNY8iYjaOum0atJtWHD3LIMuuRMR1-Ncx2qxUdZKQkjlbuo_OAWqraGpjUZaBaKMR7AvwlS-IRuRuNbY3O0-rYWq8neRlxT8sPBk1bpZn4Lge2VKJ_MKGeNpRG9njvhTqLSYJa6MsiFpcdbb2pn6EGoc3gqWRu7A7lp6o766buJbnGOJMAPxvzf6IbuxZBNwvIFs7FcZeuNC1Dr-UWGNh2rCJE-v2jJgfpkZKgNnTpfwt_1NEWX9xvXJ2pfwWxB_p9BShuOfYYCd5EQMIs48PrM6Q" name="timeline_log_data"><div><div id="u_ps_0_0_a" class="uiUfi UFIContainer"><ul class="UFIList"><li class="UFIRow UFILikeSentence UFIFirstComponent" style="display: list-item;"><div class="clearfix"><div class="_ohe lfloat"><a aria-label="Like this" role="button" title="Like this" tabindex="-1" href="#" class="img _8o _8r UFIImageBlockImage UFILikeThumb"><i class="UFILikeIcon"></i></a></div><div class=""><div class="UFIImageBlockContent _42ef _8u"><div class="UFILikeSentenceText"><span><a class="profileLink" href="">20 people</a><span> would like this.</span></span></div></div></div></div></li></ul></div></div></form></div>',
        commentRowHTML = '<li class="UFIRow UFIFirstComment UFIFirstCommentComponent UFIComment display UFIComponent"><div class="clearfix"><div class="_ohe lfloat"><a aria-hidden="true" tabindex="-1" href="https://www.facebook.com/Franzi.Kruse89?fref=ufi" class="img _8o _8s UFIImageBlockImage"><img alt="" class="img UFIActorImage _54ru" src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/p32x32/399984_528734033812449_1451271635_n.jpg"></a></div><div class=""><div class="clearfix UFIImageBlockContent _42ef"><div class="_ohf rfloat"><button tabindex="-1" title="Remove" class="_42ft _5upp _50zy _50-0 _50z- UFICommentCloseButtonFake" value="1" type="submit"><span>Remove</span></button></div><div class=""><div class="UFICommentContentBlock"><div class="UFICommentContent"><span><a href="https://www.facebook.com/Franzi.Kruse89?fref=ufi" dir="ltr" class="UFICommentActorName">Franzi Kruse</a></span><span> </span><span><span class="UFICommentBody"><span>Student*nnenwohnheim, ernsthaft? Lasst doch bitte die deutsche Sprache zufrieden, sie hat euch nichts getan.</span></span></span><span></span></div><div class="fsm fwn fcg UFICommentActions"><span><a href="/MuthesiusKunsthochschule/posts/10152423470497347?comment_id=10152423729657347&amp;offset=0&amp;total_comments=2" class="uiLinkSubtle"><abbr title="Friday, 13 June 2014 at 15:05" class="livetimestamp">13 June at 15:05</abbr></a></span><span> · </span><a title="Like this comment" role="button" href="#" class="UFILikeLink">Like</a></div><a data-tooltip-alignh="center" aria-label="Hide" class="_42ft _5upp _50zy _50-0 _50z- UFICommentCloseButton" href="#"></a></div></div></div></div></div></li>';
    
    function addComment($feedbackHolder, content) {
        var $comment = $(commentRowHTML),
            randomFriend;
        // Insert contents
        $comment.find('.UFICommentBody > span').html(content);
        // Make someone else say this
        // Friend list: https://www.facebook.com/browse/?type=page_fans&page_id=
        randomFriend = friends[Math.floor(Math.random() * friends.length)];
        $comment.find('img').attr('src', randomFriend.img);
        $comment.find('.UFICommentActorName').text(randomFriend.alt);
        // Append to comment listing
        $comment.insertAfter($feedbackHolder.find('.UFIList > li:last'));
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
            newText;
        
        likeCount = parseInt($likes.text(), 10);
        relativeAmount = /^([+\-])\s*(\d+)/.exec(amount);
        if (null !== relativeAmount) {
            switch (relativeAmount[1]) {
                case '+':
                    likeCount += parseInt(relativeAmount[2], 10);
                    break;
                case '-':
                    likeCount -= parseInt(relativeAmount[2], 10);
                    break;
            }
        } else {
            likeCount = amount;
        }
        likeCount = Math.max(0, likeCount);
        newText = $likes.text().replace(/^\d+/, likeCount);
        // debug
        //console.log('Likes: ' + $likes.text() + ' > ' + newText);
        $likes.text(newText);
        if (likeCount === 0) {
            $feedbackHolder.find('.UFILikeSentence').hide();
        } else {
            $feedbackHolder.find('.UFILikeSentence').show();
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
            var content = '';
            if (filteredReplies.length < 1 ) {
                // Could not make sense of it -> random reply
                content = replies[Math.floor(Math.random() * replies.length)];
            } else if (filteredReplies.length === 1) {
                content = filteredReplies[0];
            } else {
                // Multiple valid replies, choose randomly
                content = filteredReplies[
                    Math.floor(Math.random() * filteredReplies.length)
                ];
            }
            addComment($feedback, content);
        });
        // Manipulate likes
        if (/[:;]-?[)(D]/.test($(this).val())) {
            // Text contains smileys
            setLikes($feedback, '+20');
        }
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
            var i, j, content = [];
            for (i = 0; i < triggers.length; i++) {
                if (triggers[i][0].test(sentence)) {
                    for (j = 0; j < triggers[i][1].length; j++) {
                        content.push(replies[triggers[i][1][j]]);
                    }
                }
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
            $("<div>").html(data).find(".pluginFacepile img").each(function () {
                friends.push({img: this.src, alt: this.alt});
            });
            // debug
            //console.log('Found friends:');
            //console.log(friends);
        });
    }
    
    prepareFeedback();
    waitForUI();
    getFriendList();
}());