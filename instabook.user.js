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
        randomReplies = ['SIIIIICK!!', 'Wo bist du denn!?', 'Meinst du das ernst?', '<span title=";)" class="emoticon emoticon_wink"></span>'],
        friends,
        commentHTML = '<div class="fbTimelineUFI uiCommentContainer"><form onsubmit="return window.Event &amp;&amp; Event.__inlineSubmit &amp;&amp; Event.__inlineSubmit(this,event)" id="u_ps_0_0_8" action="/ajax/ufi/modify.php" data-ft="{&quot;tn&quot;:&quot;]&quot;}" method="post" class="commentable_item autoexpand_mode" rel="async"><input type="hidden" value="€,´,€,´,水,Д,Є" name="charset_test"><input type="hidden" autocomplete="off" value="AQEaSOiSqJ3B" name="fb_dtsg"><input type="hidden" value="{&quot;actor&quot;:&quot;259752652346&quot;,&quot;target_fbid&quot;:&quot;10152431036507347&quot;,&quot;target_profile_id&quot;:&quot;259752652346&quot;,&quot;type_id&quot;:&quot;22&quot;,&quot;assoc_obj_id&quot;:&quot;&quot;,&quot;source_app_id&quot;:&quot;0&quot;,&quot;extra_story_params&quot;:[],&quot;content_timestamp&quot;:&quot;1402918124&quot;,&quot;check_hash&quot;:&quot;AQBBBQ3-9U2ik3nO&quot;,&quot;source&quot;:&quot;13&quot;}" name="feedback_params" autocomplete="off"><input type="hidden" value="1" name="data_only_response" autocomplete="off"><input type="hidden" value="1" name="timeline_ufi" autocomplete="off"><input type="hidden" value="AQDmNkbc0CT4Q1XiEn_YK0R42jhTXNDml_TtReiPw-YvZmbdyubXmn3uwPAKZplRFdGbVVPJm_x1w5JOlQa3xsbS-xW9QtJZ8_mcNAHNQSOWWjLq9Uor4K1bXr9iPmqqdIILWNLcnILaj_Q-UxxuWDNY8iYjaOum0atJtWHD3LIMuuRMR1-Ncx2qxUdZKQkjlbuo_OAWqraGpjUZaBaKMR7AvwlS-IRuRuNbY3O0-rYWq8neRlxT8sPBk1bpZn4Lge2VKJ_MKGeNpRG9njvhTqLSYJa6MsiFpcdbb2pn6EGoc3gqWRu7A7lp6o766buJbnGOJMAPxvzf6IbuxZBNwvIFs7FcZeuNC1Dr-UWGNh2rCJE-v2jJgfpkZKgNnTpfwt_1NEWX9xvXJ2pfwWxB_p9BShuOfYYCd5EQMIs48PrM6Q" name="timeline_log_data"><div class="fbTimelineFeedbackHeader"><div class="clearfix fbTimelineFeedbackActions"><div class="clearfix"><div class="_4bl7 _4bl8"></div><div class="_4bl9"><span class="UFIBlingBoxTimeline"><span data-reactid=".3"></span></span><span data-ft="{&quot;tn&quot;:&quot;=&quot;,&quot;type&quot;:20}" class="UIActionLinks UIActionLinks_bottom"><span><span data-reactid=".4"><a data-reactid=".4.0" title="Like this" aria-live="polite" role="button" href="#" class="UFILikeLink accessible_elem">Like</a><a data-reactid=".4.1" data-ft="{&quot;tn&quot;:&quot;&gt;&quot;}" title="Like this" aria-live="polite" role="button" href="#" class="UFILikeLink">Like</a></span></span> · <label title="Leave a comment" class="uiLinkButton comment_link"><input type="button" onclick="return fc_click(this);" value="Comment" data-ft="{&quot;type&quot;:24,&quot;tn&quot;:&quot;S&quot;}" class="uiLinkButtonInput"></label> · <span><a data-reactid=".5" title="Send this to friends or post it on your Timeline." rel="dialog" href="/ajax/sharer/?s=22&amp;appid=25554907596&amp;p[0]=259752652346&amp;p[1]=10152431036507347&amp;profile_id=259752652346&amp;share_source_type=unknown&amp;__av=100000555376004" data-ft="{ &quot;tn&quot;: &quot;J&quot;, &quot;type&quot;: 25 }" class="share_action_link">Share</a></span></span></div></div></div></div><div><div id="u_ps_0_0_a" class="uiUfi UFIContainer"><ul data-reactid=".6" class="UFIList"><li data-reactid=".6.1:0" class="UFIRow UFILikeSentence UFIFirstComponent"><div data-reactid=".6.1:0.0" class="clearfix"><div data-reactid=".6.1:0.0.$left" class="_ohe lfloat"><a data-reactid=".6.1:0.0.$left.0" aria-label="Like this" role="button" title="Like this" tabindex="-1" href="#" class="img _8o _8r UFIImageBlockImage UFILikeThumb"><i data-reactid=".6.1:0.0.$left.0.0" class="UFILikeIcon"></i></a></div><div data-reactid=".6.1:0.0.$right" class=""><div data-reactid=".6.1:0.0.$right.0" class="UFIImageBlockContent _42ef _8u"><div data-reactid=".6.1:0.0.$right.0.0" class="UFILikeSentenceText"><span data-reactid=".6.1:0.0.$right.0.0.0"><a class="profileLink" href="">2 people</a><span data-reactid=".6.1:0.0.$right.0.0.0.$end:0:$0:0"> likes this.</span></span></div></div></div></div></li><li data-reactid=".6.1:4" data-ft="{&quot;tn&quot;:&quot;[&quot;}" class="UFIRow  UFIComponent UFIAddComment UFIAddCommentWithPhotoAttacher UFILastComponent"><div data-reactid=".6.1:4.0" class="clearfix UFIMentionsInputWrap"><div data-reactid=".6.1:4.0.$left" class="_ohe lfloat"><div data-reactid=".6.1:4.0.$left.0" class="img _8o _8r UFIImageBlockImage UFIReplyActorPhotoWrapper"><img data-reactid=".6.1:4.0.$left.0.0" alt="Benjamin Schwarz" src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/p32x32/25149_108200185875160_8038588_n.jpg" class="img UFIActorImage _54ru"></div></div><div data-reactid=".6.1:4.0.$right" class=""><div data-reactid=".6.1:4.0.$right.0" class="UFIImageBlockContent _42ef _8u"><div data-reactid=".6.1:4.0.$right.0.0" class="UFICommentContainer"><div data-reactid=".6.1:4.0.$right.0.0.0" class="UFIInputContainer"><div data-reactid=".6.1:4.0.$right.0.0.0.0" class="uiMentionsInput textBoxContainer ReactLegacyMentionsInput"><div data-reactid=".6.1:4.0.$right.0.0.0.0.0" class="highlighter"><div data-reactid=".6.1:4.0.$right.0.0.0.0.0.0"><span data-reactid=".6.1:4.0.$right.0.0.0.0.0.0.0" class="highlighterContent hidden_elem"></span></div></div><div data-reactid=".6.1:4.0.$right.0.0.0.0.1" class="uiTypeahead mentionsTypeahead"><div data-reactid=".6.1:4.0.$right.0.0.0.0.1.0" class="wrap"><input type="hidden" data-reactid=".6.1:4.0.$right.0.0.0.0.1.0.0" class="hiddenInput" autocomplete="off"><div data-reactid=".6.1:4.0.$right.0.0.0.0.1.0.1" class="innerWrap"><textarea data-reactid=".6.1:4.0.$right.0.0.0.0.1.0.1.0" value="Write a comment..." placeholder="Write a comment..." title="Write a comment..." class="textInput mentionsTextarea uiTextareaAutogrow uiTextareaNoResize UFIAddCommentInput DOMControl_placeholder" name="add_comment_text">Write a comment...</textarea></div></div></div><input type="hidden" data-reactid=".6.1:4.0.$right.0.0.0.0.2" value="" class="mentionsHidden" autocomplete="off"></div><div data-reactid=".6.1:4.0.$right.0.0.0.1" class="UFICommentAttachmentButtons clearfix"><div data-reactid=".6.1:4.0.$right.0.0.0.1.0" aria-label="Attach a Photo" data-tooltip-alignh="center" data-hover="tooltip" class="UFIPhotoAttachLinkWrapper _m"><i data-reactid=".6.1:4.0.$right.0.0.0.1.0.0" class="UFICommentPhotoIcon"><input type="file" accept="image/*" class="_n" name="file" title="Choose a file to upload" aria-label="Choose a file to upload"></i></div></div></div></div></div></div></div></li></ul></div></div></form></div>',
        commentRowHTML = '<li data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0" data-ft="{&quot;tn&quot;:&quot;R0&quot;}" class="UFIRow UFIFirstComment UFIFirstCommentComponent UFIComment display UFIComponent"><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0" class="clearfix"><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$left" class="_ohe lfloat"><a data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$left.0" aria-hidden="true" tabindex="-1" data-ft="{&quot;tn&quot;:&quot;T&quot;}" data-hovercard="/ajax/hovercard/hovercard.php?id=100000275705928&amp;extragetparams=%7B%22hc_location%22%3A%22ufi%22%7D" href="https://www.facebook.com/Franzi.Kruse89?fref=ufi" class="img _8o _8s UFIImageBlockImage"><img data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$left.0.0" alt="" class="img UFIActorImage _54ru" src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/t1.0-1/p32x32/399984_528734033812449_1451271635_n.jpg"></a></div><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right" class=""><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0" class="clearfix UFIImageBlockContent _42ef"><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$right" class="_ohf rfloat"><button data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$right.0" tabindex="-1" title="Remove" class="_42ft _5upp _50zy _50-0 _50z- UFICommentCloseButtonFake" value="1" type="submit"><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$right.0.1">Remove</span></button></div><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left" class=""><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0" class="UFICommentContentBlock"><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0" class="UFICommentContent"><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0.$author"><a data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0.$author.0" href="https://www.facebook.com/Franzi.Kruse89?fref=ufi" dir="ltr" data-ft="{&quot;tn&quot;:&quot;;&quot;}" data-hovercard="/ajax/hovercard/hovercard.php?id=100000275705928&amp;extragetparams=%7B%22hc_location%22%3A%22ufi%22%7D" class="UFICommentActorName">Franzi Kruse</a></span><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0.1:0"> </span><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0.1:$comment-body" data-ft="{&quot;tn&quot;:&quot;K&quot;}"><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0.1:$comment-body.0" class="UFICommentBody"><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0.1:$comment-body.0.$end:0:$0:0">Student*nnenwohnheim, ernsthaft? Lasst doch bitte die deutsche Sprache zufrieden, sie hat euch nichts getan.</span></span></span><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.0.4"></span></div><div data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.3" class="fsm fwn fcg UFICommentActions"><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.3.$metadata:0"><a data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.3.$metadata:0.$timestamp-message" data-ft="{&quot;tn&quot;:&quot;N&quot;}" href="/MuthesiusKunsthochschule/posts/10152423470497347?comment_id=10152423729657347&amp;offset=0&amp;total_comments=2" class="uiLinkSubtle"><abbr data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.3.$metadata:0.$timestamp-message.0" data-utime="1402664720" title="Friday, 13 June 2014 at 15:05" class="livetimestamp">13 June at 15:05</abbr></a></span><span data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.3.$likeToggle:0:$MIDDOT:0"> · </span><a data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.3.$likeToggle:0:$action:0" title="Like this comment" role="button" href="#" data-ft="{&quot;tn&quot;:&quot;&gt;&quot;}" class="UFILikeLink">Like</a></div><a data-reactid=".1c.1:3:1:$comment10152423470497347_10152423729657347:0.0.$right.0.$left.0.4" data-tooltip-alignh="center" data-hover="tooltip" aria-label="Hide" class="_42ft _5upp _50zy _50-0 _50z- UFICommentCloseButton" href="#"></a></div></div></div></div></div></li>';
    
    function addComment($feedbackHolder, content) {
        var $comment = $(commentRowHTML),
            randomFriend;
        // Insert contents
        $comment.find('.UFICommentBody > span').html(content);
        // Make someone else say this
        // Friend list: https://www.facebook.com/browse/?type=page_fans&page_id=
        randomFriend = friends[Math.floor(Math.random()*friends.length)];
        $comment.find('img').attr('src', randomFriend.img);
        $comment.find('.UFICommentActorName').text(randomFriend.alt);
        // Append to comment listing
        $comment.insertBefore($feedbackHolder.find('.UFIList > li:last'));
    }
    
    function removeComment($feedbackHolder, removeAll) {
        if (true === removeAll) {
            // remove all comments
            $feedbackHolder.find('.UFIList > li.UFIComment').remove();
        } else {
            // remove last comment (-2 b/c last is own comment form)
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
        
        likeCount = parseInt($likes.text());
        relativeAmount = /^([+-])\s*(\d+)/.exec(amount);
        if (null !== relativeAmount) {
            switch (relativeAmount[1]) {
                case '+':
                    likeCount += parseInt(relativeAmount[2]);
                    break;
                case '-':
                    likeCount -= parseInt(relativeAmount[2]);
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
            comment;
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
            $feedback.appendTo($(this).closest('.child_is_active').parent());
            $(this).data({hasFeedback: true, feedback: $feedback});
        }
        // TODO Fill feedback more than once/react to others' comments
        getComment($(this).val()).done(function () {
            var content = ''; // TODO fill with results from getComment
            content = randomReplies[Math.floor(Math.random()*randomReplies.length)];
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
    
    function getComment() {
        // TODO implement chatbot api
        var promise = $.get();
        return promise;
    }
    
    function waitForUI() {
        // Add script to composer textarea
        waitForKeyElements('textarea[name=xhpc_message_text]', function (jNode) {
            var timeout;
            console.log('found fbTimelineComposerUnit:');
            console.log(jNode);
            jNode.eq(0).on('keyup', function (e) {
                if (timeout !== undefined) {
                    window.clearTimeout(timeout);
                }
                timeout = window.setTimeout(function () {
                    handleKeyUp.call(e.target);
                }, 1000);
            }).on('keydown', handleKeyDown);
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