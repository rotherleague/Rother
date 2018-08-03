---
layout: page
title: Rother League Contact
---

<form id="formaction" method="POST">
    <p>Name: </p><input type="text" name="name" required><br />
    <p>Email: </p><input type="email" name="email" required><br />
    <input type="text" name="_gotcha" style="display:none" />
    <input type="submit" value="Send">
    <input type="hidden" name="_next" value="//path/thanks.html" />
</form>
<script>
    var contactform =  document.getElementById('formaction');
    contactform.setAttribute('action', '//formspree.io/' + 'rotherleague' + '@' + 'gmail' + '.' + 'com');
</script>
