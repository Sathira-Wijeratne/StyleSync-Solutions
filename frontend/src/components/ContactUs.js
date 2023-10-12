import React from 'react';

export default function ContactUs() {
    const mainDivStyle = {
        margin: '100px', // You can adjust the margin size as needed
      };

  return (
    <div style={mainDivStyle}>
      <form>
      <div class="form-group">
      <label for="exampleInputPassword1">Name</label>
      <input type="text" class="form-control" id="exampleInputPassword1"/>
    </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
 
  
      <div class="form-group">
    <label for="exampleInputPassword1">Contact Number</label>
    <input type="text" class="form-control" id="exampleInputPassword1"/>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">Inqury</label>
    <input type="text" class="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  );
}
