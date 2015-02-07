/**
 * Created by Sangmin on 2/2/2015.
 */
var questionList = [];
$(document).ready(function () {

    populateQuestions();

    //Add Question
    $('#btnAddQuestion').on('click', addQuestion);

    //Calculate score
    $('#btnSHEDScore').on('click', scoreVerbiage);
});

function populateQuestions() {
    var tableContent = '';

    $.getJSON('/questions/questions', function(data) {

        questionList = data;

        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td style="text-align:left;">' + this.question_text + '.</a></td>';
            tableContent += '<td><input type="radio" name="q' + this.id + '" value="1"> </td>';
            tableContent += '<td><input type="radio" name="q' + this.id + '" value="2"> </td>';
            tableContent += '<td><input type="radio" name="q' + this.id + '" value="3"> </td>';
            tableContent += '<td><input type="radio" name="q' + this.id + '" value="4"> </td>';
            tableContent += '<td><input type="radio" name="q' + this.id + '" value="5"> </td>';
            tableContent += '</tr>';
        });

        $('#userList table tbody').html(tableContent);
    });
}

// Validate and calculate score, then output result
function scoreVerbiage(event) {
    event.preventDefault();
    // SHED variables
    var s = 0;
    var h = 0;
    var e = 0;
    var d = 0;

    //Basic validation
    var errorCount=0;
    for (var i=1; i<=questionList.length; i++) {
        var radio = document.getElementsByName('q'+i);
        var notChecked = 0;
        for (var j=0; j <radio.length; j++){
            if(radio[j].checked){
                questionList[i-1].answer = radio[j].value;
                switch (questionList[i-1].shed) {
                    case "s":
                        s += parseInt(radio[j].value);
                        break;
                    case "h":
                        h += parseInt(radio[j].value);
                        break;
                    case "e":
                        e += parseInt(radio[j].value);
                        break;
                    case "d":
                        d += parseInt(radio[j].value);
                        break;
                    default:
                        break;
                }
            } else {
                notChecked++;
                if (notChecked === 5) {errorCount++;}
            }
        }

        if(document.getElementsByName('q'+(i+1)) === '') {
            errorCount++;
        }
    }

    if (errorCount === 0) {
        var url = location.href;
        location.href = "#Top";
        history.replaceState(null, null, url);
        $('#shed-title').text("SHED Result");
        $('#shed-description').html(shedResultDesc);
        $('#userList').html(shedResult(s,h,e,d));

    } else {
        alert("Please make sure all questions are answered.")
    }
}
var shedResultDesc = '<h2 class="text-align-center"> Your Unique SHED Profile </h2>' +
    '<p>SHED is a practical process for managing any change or transition. By helping you release obsolete items and obligations from your physical space and schedule, SHED eliminates old belief systems, fortifies your identity and creates the space to think and move.</p>' +
    '<p>This process, however, isn\'t always easy. It\'s natural to stumble along the way, losing steam or speeding through steps you find particularly challenging. If you fast-forward steps or go out of order, you will shortchange the process and your transition won\'t be nearly as transformative or fulfilling.</p>' +
    '<p>Read below to see how you are likely to fair in each step.</p>';

function shedLevel(total) {
    if (total < 13)
        return "Smooth Sailing";
    else if (total < 21)
        return "Need Improvement";
    else
        return "Trouble Area";
}

function shedResult(s, h, e, d) {
    var result = '';
    // Step: Separate
    result += linebreak;
    result += '<h1 class="text-align-center">Separate</h1>';
    result += '<p>Separating the treasures gives you an opportunity to reflect on your situation and identify what\'s actually working. Buried in even the most oppressive clutter, there is a small percentage of stuff that has practical or emotional value. These objects present clues to who you are. Taking the time to unearth them (before throwing everything away) positions you to make a more complete transition, rather than a temporary fix.<p>';
    result += '<p><strong>Diagnosis: </strong><em>'+shedLevel(s)+'</em><br/>'+sObject.diagnosis(s)+'</p>';
    result += '<p><strong>Chapters to Pay Special Attention to in WHEN ORGANIZING ISN\'T ENOUGH</strong><br/>'+sObject.attention(s)+'</p>';
    // Step: Heave
    result += linebreak;
    result += '<h1 class="text-align-center">Heave</h1>';
    result += '<p>You can get organized without throwing things away, but you can\'t SHED without opening up space. Heaving is fundamentally about releasing old attachments, whether those attachments are items in your physical space (like shelves full of books you haven\'t read) or related to your schedule, in the form of commitments you resent, roles you\'ve outgrown and projects that shouldn\'t be on your to-do list.<p>';
    result += '<p><strong>Diagnosis: </strong><em>'+shedLevel(h)+'</em><br/>'+hObject.diagnosis(h)+'</p>';
    result += '<p><strong>Chapters to Pay Special Attention to in WHEN ORGANIZING ISN\'T ENOUGH</strong><br/>'+hObject.attention(h)+'</p>';
    // Step: Separate
    result += linebreak;
    result += '<h1 class="text-align-center">Embrace</h1>';
    result += '<p>Embracing your identity is a chance to reconnect to who you are, without your stuff. After you\'ve lightened your load in "Heave", the goal of "Embrace" is to fortify your self-confidence as you remain exposed to the world without the comforts of your old shell.<p>';
    result += '<p><strong>Diagnosis: </strong><em>'+shedLevel(e)+'</em><br/>'+eObject.diagnosis(e)+'</p>';
    result += '<p><strong>Chapters to Pay Special Attention to in WHEN ORGANIZING ISN\'T ENOUGH</strong><br/>'+eObject.attention(e)+'</p>';
    // Step: Separate
    result += linebreak;
    result += '<h1 class="text-align-center">Drive</h1>';
    result += '<p>Drive is the time to make tangible progress on your theme. It\'s an opportunity to experiment with new activities - to see what works and what doesn\'t - without the fear of failure. Drive is a two-steps- forward, one-step-back kind of experience. As you chart a new course, you are bound to make mistakes, but armed with a strong sense of self and a keen vision of the future, you will have all the tools you need to keep yourself on track.<p>';
    result += '<p><strong>Diagnosis: </strong><em>'+shedLevel(d)+'</em><br/>'+dObject.diagnosis(d)+'</p>';
    result += '<p><strong>Chapters to Pay Special Attention to in WHEN ORGANIZING ISN\'T ENOUGH</strong><br/>'+dObject.attention(d)+'</p>';
    return result;
}

/*
 * Step Objects
 */

//Separate
var sObject = {
    'diagnosis': function(total){
        if (total< 13) {
            return "You recognize that all items, activities and opportunities are not created equal and can pretty rapidly identify the treasures - the 10 to 20 percent of items that have practical or meaningful value. You find it relatively easy to come up with criteria for determining what is most important when faced with a pile of belongings, activities or to-dos. If you were moving, for example, and had to pare down your clothing or book collection, you'd be able to pull your favorites quickly.";
        } else if (total<21) {
            return "It's easier for you to identify treasures - the 10 to 20 percent of items that have practical or meaningful value - in some areas, than it is in others. Perhaps you can instantly find the treasures in your closet, but have a harder time when it comes to your schedule?or vice versa. On average you tend to be a bit overgenerous in your definition of what's truly valuable. This tendency could result in your hanging on to too much, failing to create the space for something new.";
        } else {
            return "It's difficult for you to prioritize objects and activities - everything seems to have equal importance. Your identity is wrapped up in your attachment to items in your physical space, the roles you play and the activities that fill your calendar." +
                "<br /><br />You might consider yourself the family archivist - in your eyes each object has a persona and everything has a history, proving you were there or that something happened." +
                "<br /><br />You probably have an all or nothing approach. You either hang onto everything, never creating the space for something new, or you dump it all, risking the chance that you toss something that could be valuable to you.";
        }
    },
    'attention': function(total){
        if (total< 13) {
            return "Section II, Separate the Treasures, will be a relatively step for you, but insightful nonetheless. Pay particular attention to the pages devoted to \"Find Value in the Clutter\" in Chapters 4, 5 and 6 to discover understanding your attachment to old things before you get rid of them. You may be enlightened by what you find. Just as importantly, enjoy the process of developing your criteria for what is a true treasure.";
        } else if (total<21) {
            return "Take your time going through Section II, Separate the Treasures. Pay particular attention to the subsection \"How do I Know It's a Treasure\" in Chapters 4,5 and 6,  which will guide you in developing very clear criteria for what is truly worth keeping in your life, and what is obsolete.  Then push yourself to distinguish between \"true\" treasures and things that are \"close, but not quite\"";
        } else {
            return "The real KEY to transforming your ability to Separate the Treasures is by concentrating on Chapter 2 of the book,  \"Name Your Theme\", which will which will help you develop a vision for where you are headed. The more vividly you can imagine the direction of your future, the easier it will be to cherry-pick the treasures that will be relevant to you in the coming weeks and months. Then, take as much time as you need to work through Section II, Separate the Treasures (Chapters 4, 5 and 6) where you will discover how to develop very clear criteria for truly worth keeping in your life, and what is just an obsolete burden.";
        }
    }
};

// Heave
var hObject = {
    'diagnosis': function(total){
        if (total< 13) {
            return "Once you have decided something is no longer serving you, you usually have no trouble letting it go. This goes for belongings (e.g. clothes that no longer fit) and responsibilities you have outgrown. You are a good delegator, genuinely handing over responsibility to your delegatees." +
                "<br /><br />You toss things with such ease that you might be prone to heave a little overzealously, heaving items the moment you are done with them. Don't be in such a rush to throw things away that you accidentally dump treasures that might be useful to you in the future. ";
        } else if (total<21) {
            return "You are able to release the most obvious forms of clutter - worn out shoes, outdated information and tasks that on second thought don't really provide value, re-indexing your old recipes, for example." +
                "<br /><br />You do struggle, however, to release clutter that is less obviously trash.  You may hesitate to heave objects because you see their monetary value and hate to waste money." +
                "<br /><br />Certain belongings and commitments, however irrelevant to your current life, feel like a testament to who you are - look how many records I've collected, or see what a wonderful job I do writing these status reports (even if you've moved on to bigger and better responsibilities)." +
                "<br /><br />Part of you worries that by releasing these attachments you might lose credibility, confidence or part of your identity. Studying your resistance to heaving particular objects will help you understand your attachment, making them easier to release. Harmless as they seem, a failure to let go of the less obvious trash will prevent you from opening up enough space, keeping you more anchored in the past than is desirable.";
        } else {
            return "You are uncomfortable getting rid of anything, even if it's something that is obviously broken or irrelevant to your current situation. As much as you like having options and the tools on hand to manage any situation, you're not attached to the specific items in your home or activities in your day, so much as the volume of stuff you have acquired - the abundance in your closets and the over-packed schedule you keep." +
                "<br /><br />You worry that heaving objects will cause you to forget who you are and what you've done, or that you won't be valuable without your old role and responsibilities. Letting things go also makes you feel guilty, like you are shirking responsibility, while your current state of abundance makes you feel important and needed. For all these reasons, you might often feel overwhelmed, overloaded and burnt out." +
                "<br /><br />Your identity is wrapped up in the clutter, which is serving as a very handy distraction that keeps you from moving forward. In your mind the status quo is cozy (however obsolete) and much more comfortable than some unknown future. You might get so far as being able to identify items to heave (but never get them out the door) or you will continue to layer new, more relevant items on top of old, defunct things in your space and schedule. Ultimately, this load will slow you down and prevent you from opening space for something new.";
        }
    },
    'attention': function(total){
        if (total< 13) {
            return "Specifically because heaving comes so easy, my advice here is to slow down and be patient.  Concentrate first on Chapter 2, \"Name Your Theme\", so that you have a solid and new context on which to decide what stays vs what goes.  Then, avoid the temptation to skip Section II, Separate the Treasures (Chapters 4, 5 and 6), which helps you identify treasures in your physical space, schedule and behavior. Stop to compare items to your theme before you throw them away. You want to make sure you bring the best of yourself forward.";
        } else if (total<21) {
            return "Take your time going through Section III, Heave the Trash (Chapters 7, 8 and 9), which will help you navigate the mechanics and emotion of releasing physical, schedule and habit clutter. In addition, recruiting a friend or family member to lend moral support and an extra pair of hands will make it easier for you to let things go.";
        } else {
            return "Pay particular attention to Chapter 3, \"Pick Your Starting Point\", where you will identify the pockets of clutter, or \"points of entry\", that are candidates for your heave. Then, zero in on Chapters 7, 8  or 9 (in Section III, Heave the Trash) depending on whether you are releasing attachments to physical, schedule or habit clutter. Keep in mind that a successful heave requires you to harmonize mechanics, emotion and momentum. Recruiting a friend or family member to lend an extra pair of hands and moral support will make it easier for you to let things go.";
        }
    }
};

// Embrace
var eObject = {
    'diagnosis': function(total){
        if (total< 13) {
            return "You are highly self-aware and confident in who you are, even without your old stuff, habits and roles.  You don't need objects or busy-ness to define you because you have such a clear sense of self and what interests you.  You trust yourself to get through any situation, sure that you have the inner resources to figure things out and land on your feet." +
                "<br /><br />You are also comfortable enough in your own skin to just show up in life and enjoy the moment without excessive worry about the past or future.  People in your life might describe you as fearless, feisty or unflappable, especially when it comes to handling unexpected situations." +
                "<br /><br />There are only a few dangers of being so introspective. One, you might get tangled in a loop of endless self-analysis, instead of taking concrete steps forward. Or two, you may occasionally be overconfident, which prevents you from seeking out opportunities to grow and evolve.";
        } else if (total<21) {
            return "You have a moderate degree of self-confidence, enough to function pretty well in life, but you often look to others for affirmation that you are good enough, smart enough or attractive enough. (You think these things are true of yourself, but you need regular reassurance.)  As confident as you are, you are regularly consumed by lingering moments of self-doubt - What do I actually want?, Is this right?, Who am I?" +
                "<br /><br />Generally speaking, you are most comfortable when you have something to focus your energies on - a project, a relationship, or a goal. Without something specific to funnel your energies toward, you are apt to worry about the past or be anxious about the future. The empty space left behind by your heave will make you feel nervous. Try to imagine what your life would be like if you were to trust your intuition even more?allowing your confidence to come from within.";
        } else {
            return "You never really had a chance to develop a clear sense of yourself growing up.  You consented to other people's expectations and allowed societal norms to guide your decisions. You got good grades, went to a choice college and pursued a profession that others prescribed." +
                "<br /><br />Since you haven't had a chance to define yourself for yourself, it's hard for you to embrace the moment. You tend to be consumed with worry about the past (Did I do something wrong? Am I in trouble?), or anxious about the future (What should I do next? Is this the right decision?) Your identity has been defined for so long by outside forces - a job, material acquisitions, a neighborhood, a relationship - it's hard to imagine your life being any different from how it has always been." +
                "<br /><br />Stripped of your old attachments, carving out a new identity for yourself will at first feel intimidating and disorienting. Anticipate the anxiety that accompanies any major change (in this case the release of old objects, activities and habits) and find the courage to stand empty handed. You have to give yourself more credit for the fact that you are who you are, without your stuff. Take time to savor the empty space, and fill it with self-discovery?you'll be surprised how close answers to the question \"Who am I?\", really are.  Take heart in knowing that you will eventually fill your empty spaces with objects and activities that are more relevant to your theme for the future.";
        }
    },
    'attention': function(total){
        if (total< 13) {
            return "Section IV, Embrace your Identity (Chapters 10, 11 and 12) will come pretty easy to you, but don't be so fast to skip it, because it will further your self-understanding through a series of exercises that provide insight into your style and obstacles. Pay special attention to Chapter 11 and Chapter 13 \"Discipline to Deliver\", and \"Break Your Mold\" which provides key opportunities and insights on how you can enhance your unique contribution to the world, and expand your vision of yourself.";
        } else if (total<21) {
            return "Be sure to do the exercises in Chapter 2,  \"Name Your Theme\", which will give you something very palpable; a vision for your future to  hang onto as you separate your identity from your stuff.  As you go through Section IV, Embrace Your Identity, pay particular attention to Chapter 10, \"Trust Yourself\", where you will happily discover that the answer to the question \"Who Am I?\" is much closer than you think.  Equally important for you is Chapter 12, \"Live in the Moment\", which will strengthen your muscles to fully engage in the present, rather than worry about what was or what will be, and discover how vibrant life can be in that state.";
        } else {
            return "Section III, Embrace Your Identity, will help you fortify your self-understanding through a series of exercises that provide insight about your style and obstacles. Pay particular attention to Chapter 10, \"Trust Yourself\", a confidence-booster that will ask you to remember situations when you've excelled, even though you were \"empty-handed\". Chapter 11, \"Discipline to Deliver\", will help you get out of your own way so you can deliver on your potential, while Chapter 12, \"Live in the Moment\", will school you in the art of living in the moment.";
        }
    }
};

// Drive
var dObject = {
    'diagnosis': function(total){
        if (total< 13) {
            return "You are courageous and will have a pretty easy time moving toward a new destination. Always up for trying something new, you trust completely in your own ability to adjust to unexpected situations and spin on a dime. Your life has always been exciting and adventurous - no one could ever accuse you of being complacent. You rarely think in terms of failure, trusting that whatever you learn will be valuable.  The only danger in your adventuresome spirit is that it may sometimes cause you to leap before you look. This tendency leads you to dive headlong into new activities and responsibilities, only to find out later (after much wasted time and effort) that they are not a fit for you at all. Do all the steps in \"Drive\" in order, from breaking your mold to experimenting on your theme.  Then push yourself to come up with additional ideas on how to explore your new direction.";
        } else if (total<21) {
            return "You are willing to try new things and learn new skills, but you tend to stay within your comfort zone - moving forward but usually on the same basic path you established for yourself long ago. If you've always loved Beethoven or the Beatles, your idea of adventure is studying Mozart or the Monkeys, rather than exploring something totally off beat, like sculpture or the solar system. It's hard for you to think beyond your normal purview or try anything that is too far flung from what is already familiar. This resistance to trying new things is often connected to a deeply rooted fear of failure.  You stick within your comfort zone, because you like to excel at everything you do. This fear creates hidden limits on your ability to chart a completely fulfilling direction for your future.";
        } else {
            return "Even once you have cleared all the obstacles from your path, you still feel paralyzed, unable to move forward.  You have a great fear of the unknown and remain uncertain that you can pull something off. You doubt whether you deserve the happiness you seek.  You might be so worried about failing, that you can't get yourself in gear.  Or you may be overwhelmed with too many options (Which one should I go with?  Which one is right?), unable to translate your big dreams into smaller, achievable steps." +
                "<br /><br />Sometimes, it's hard to picture doing things any other way than you've always done them, so you can't even think of new ideas.   You've barely started one thing before you begin another, thereby making no significant progress on any front. Excessive worrying, or \"analysis paralysis\", keeps you from exploring with joy." +
                "<br /><br />Remember that \"Drive\" is a process of two steps forward and one step back. Fortify your vision and reinvigorate your conviction that you are moving in the right direction. You have to accept the idea that your vision (and how you achieve that vision) will evolve as you go.";
        }
    },
    'attention': function(total){
        if (total< 13) {
            return "Use Section V, Drive Yourself Forward (Chapters 13, 14 and 15), like your own personal test-kitchen. Take the time to study your possibilities, savoring each experiment without rushing to quick decisions. Being patient with your progress in \"Drive\" can extend the ride until you find what you really want.";
        } else if (total<21) {
            return "Focus on Chapter 13, \"Breaking Your Mold.\" This chapter is designed to help you expand your blinders and give yourself a chance to succeed (or fail!) at something totally different from your regular roles and responsibilities. You'll be encouraged to do something you've never done before - learn to cook, ballroom dance or even sign up for trampoline lessons!  Experiencing failure, even a little bit at a time, will help ease your fear - you'll also be able to imagine yourself doing brand new things you never thought possible.";
        } else {
            return "Take your time going through each chapter in Section IV, \"Drive Yourself Forward\", which provides all the tools you need take concrete steps towards your vision. It'll get you moving no matter how anxious or paralyzed you feel. Chapter 13, \"Break Your Mold\", will push you to expand your blinders and give yourself a chance to succeed (or fail!) at something totally different from your regular roles and responsibilities. You'll be encouraged to do something you've never done before - learn to cook, ballroom dance or even sign up for trampoline lessons!  Chapter 14, \"Experiment on Vision\", guides you through the process of experimenting with activities that are more directly related to your theme. And Chapter 15, \"Stay on Track\", reminds you that there is no \"finish line\" for SHED. After a self-assessment, you'll evaluate your progress and develop a plan to keep moving towards your goal.";
        }
    }
};

//Add Question function
function addQuestion(event) {
    console.log("I got clicked");
    event.preventDefault();

    //Very basic validation
    var errorCount = 0;
    $('#addQuestion textarea').each(function(index, val) {
        if($(this).val() === '')
            errorCount++;
    });

    $('#addQuestion input').each(function(index, val) {
        if($(this).val() === '')
            errorCount++;
        else
            console.log($(this.val()));
    });

    if(errorCount === 0) {
        var newQuestion = {
            'question_text': $('#addQuestion fieldset textarea#inputQuestion').val(),
            'shed': $('#addQuestion fieldset input#inputSHED').val()
        };

        console.log($('#addQuestion fieldset input#inputSHED').val());

        $.ajax({
            type:'POST',
            data: newQuestion,
            url:'/questions/addquestion',
            dataType: 'JSON'
        }).done(function(response) {

            if (response.msg === '') {

                // clear textarea and input
                $('#addQuestion fieldset textarea').val('');
                $('#addQuestion fieldset input').val('');

                // update table
                populateTable();
            } else {

                alert('Error: ' + response.msg);
            }
        })
    } else {
        //Alert form is empty
        alert('Please fill in all the fields');
        return false;
    }
}

// Line break HTML from squarespace
var linebreak = '<div class="sqs-block horizontalrule-block sqs-block-horizontalrule" data-block-type="47" id="block-yui_3_17_2_2_1417030786881_7558"><div class="sqs-block-content"><hr></div></div>'