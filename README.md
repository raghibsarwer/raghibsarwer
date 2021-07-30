// Java Script How to Grant permission to user in SharePoint GRoup

//User Interface

<div id="hide">
   <div>
      <p class="username">User Email id / User Name&nbsp<span style="color:red;">*<span></p>
      <div id="peoplePickerDiv">
      </div>
   </div>
   <span ID="PeoplePickervalidation" class="pplpickervalidation"></span>
   <div>
      <br/><p class="securityprograms" >Select the Security Programs&nbsp<span style="color:red;">*</span></p>
      <select id = "myList" class="ddlselect" onchange = "getGroupName();" >
         <option value="void">--Please Select--</option>
         <option value="FACAOSSP">FACAOSSP</option>
         <option value="AOSSP">AOSSP</option>
         <option value="TSAPCSSP">TSAPCSSP</option>
         <option value="test1">test1</option>
      </select>
   </div>
   <span ID="selectddl" class= "ddlcustomevalidation"></span>
   <br/>
   <div><input type="button" style="margin-left:0px" class="submit" value="Grant Access" onclick="AddUserIntoSecurityGroup('peoplePickerDiv');"></input>
   </div>
</div>
   
