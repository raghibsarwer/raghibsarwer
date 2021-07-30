<script type="text/javascript" src="_layouts/15/clienttemplates.js"></script>  
<script type="text/javascript" src="_layouts/15/clientforms.js"></script>  
<script type="text/javascript" src="_layouts/15/clientpeoplepicker.js"></script>  
<script type="text/javascript" src="_layouts/15/autofill.js"></script>

<div>
<div>
    <br/><p style="color:#666666;font-family:Arial Regular;font-weight: bold;">User Email id / User Name</p>  
    <div id="peoplePickerDiv"></div></div>
    <div>
   <br/><p style="color:#666666;font-family:Arial Regular;font-weight: bold;">Select the security Group</p><br/>
    <select id = "myList" style="color:#666666" onchange = "getGroupName();" > 
    <option value="void">--Please Select--</option>  
    <option value="FACAOSSP">FACAOSSP</option>  
    <option value="AOSSP">AOSSP</option>  
    <option value="TSAPCSSP">TSAPCSSP</option>  
    </select></div>
    <div><input type="button" class="submit" value="Grant Access" onclick="getUserInfo('peoplePickerDiv');"></input></div>
    </div>
   
<div><span ID="success" style="font-color: gray; font-weight:bold"></span></div> 
<div><span ID="error" style="font-color: red; font-weight:bold"></span></div> 

<script type = "text/javascript" >
 var subject="";  
 var UsersID;
 var body="";
 var UsersEmail;
 var CurrnetloginguserID, CurrnetloginguserName, CurrnetloginguserEmail;
    
     
    // Run your custom code when the DOM is ready.
    $(document).ready(function() {

        // Specify the unique ID of the DOM element where the
        // picker will render.
        initializePeoplePicker('peoplePickerDiv');
        fetchUserInfo();
    });

// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {

    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '350px';

    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

// Query the picker for user information.
function getUserInfo(PeoplepickerId) {
     
    UsersID = "";
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];

    if (peoplePicker.HasInputError) return false; // if any error
    else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users
    else if (peoplePicker.TotalUserCount > 0) {
        // Get information about all users.
        var users = peoplePicker.GetAllUserInfo();
        //var userInfo = '';
        //var promise = '';
        for (var i = 0; i < users.length; i++) {
            UsersID = users[i].DisplayText;
            UsersEmail = users[i].EntityData.Email;
            subject="Access has been granted to" + " " + UsersID;
            body="Acknowledgement,Access has been granted to Approved users";           
           
            var clientContext = new SP.ClientContext.get_current();
            var siteGroups = clientContext.get_web().get_siteGroups();
            var web = clientContext.get_web();
            //spGroup = siteGroups.getByName(getGroupName());
            spGroup = siteGroups.getByName('jfjffhfhf');

            user = web.ensureUser(UsersEmail);
            var userCollection = spGroup.get_users();
            userCollection.addUser(user);
            clientContext.load(user);
            clientContext.load(spGroup);
            sendEmail('globalnet@atlasair.com', UsersEmail,CurrnetloginguserEmail, body, subject)
            clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
            

        }
    }
}

function onQuerySucceeded() {
    console.log('success');
    document.getElementById("success").innerHTML = " " + "User Added Successfully..";
}

function onQueryFailed() {
    //console.log('Request failed.');
    document.getElementById("error").innerHTML = " " + "An error occurred, contact to Gnet Support team @ GNetSupportTeam@AtlasAir.com";
}

function getGroupName() {
    var select = document.getElementById("myList");
    return answer = select.options[select.selectedIndex].value;
}


function sendEmail(from, to,cc, body, subject) {
    //Get the relative url of the site
   
    var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': {
                    'type': 'SP.Utilities.EmailProperties'
                },
                'From': from,
                'To': {
                    'results': [to]
                },
                'CC': {
                    'results': [cc]
                },

                'Body': body,
                'Subject': subject
            }
        }),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function(data) {
            console.log('Email Sent Successfully');
        },
        error: function(err) {
            console.log('Error in sending Email: ' + JSON.stringify(err));
        }
    });
}

function fetchUserInfo() {  
        $.ajax({  
            url: siteurl + "/_api/Web/CurrentUser",  
            meathod: "GET",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
            },  
            cache: false,  
            async: false,  
            success: function(data) {  
            	//console.log("login user details: " + data);
            	CurrnetloginguserID = data.d.Id;
                CurrnetloginguserName = data.d.Title;  
                CurrnetloginguserEmail = data.d.Email;
                //console.log("User Details: Display Name > " + userName + " and Email id is: " + userEmail);  
            },  
            error: function(data) {  
            console.log(data.responseJSON.error);  
            }  
        });  
    }


</script>