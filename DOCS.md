# conectikids v0.0.0



- [Activities](#activities)
	- [Retrieve all activities of a course](#retrieve-all-activities-of-a-course)
	- [Create activities](#create-activities)
	- [Delete activities](#delete-activities)
	- [Retrieve activities](#retrieve-activities)
	- [Update activities](#update-activities)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Chats](#chats)
	- [Create chats](#create-chats)
	- [Delete chats](#delete-chats)
	- [Retrieve chats](#retrieve-chats)
	- [Update chats](#update-chats)
	
- [Chatsusers](#chatsusers)
	- [Create chatsusers](#create-chatsusers)
	- [Delete chatsusers](#delete-chatsusers)
	- [Retrieve chatsusers](#retrieve-chatsusers)
	- [Update chatsusers](#update-chatsusers)
	
- [Childrens](#childrens)
	- [Create childrens](#create-childrens)
	- [Delete childrens](#delete-childrens)
	- [Retrieve childrens](#retrieve-childrens)
	- [Update childrens](#update-childrens)
	
- [Comments](#comments)
	- [Create comments](#create-comments)
	- [Delete comments](#delete-comments)
	- [Retrieve comments](#retrieve-comments)
	- [Retrieve comments of a activity](#retrieve-comments-of-a-activity)
	- [Update comments](#update-comments)
	
- [Courses](#courses)
	- [Create courses](#create-courses)
	- [Delete courses](#delete-courses)
	- [Retrieve courses that a user has registered](#retrieve-courses-that-a-user-has-registered)
	- [Retrieve courses](#retrieve-courses)
	- [Update courses](#update-courses)
	
- [Gardens](#gardens)
	- [Create gardens](#create-gardens)
	- [Delete gardens](#delete-gardens)
	- [Retrieve gardens](#retrieve-gardens)
	- [Update gardens](#update-gardens)
	
- [Likes](#likes)
	- [Create likes](#create-likes)
	- [Delete likes](#delete-likes)
	- [Retrieve likes](#retrieve-likes)
	- [Update likes](#update-likes)
	
- [Messages](#messages)
	- [Create messages](#create-messages)
	- [Delete messages](#delete-messages)
	- [Retrieve messages](#retrieve-messages)
	- [Update messages](#update-messages)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Tasks](#tasks)
	- [Create tasks](#create-tasks)
	- [Delete tasks](#delete-tasks)
	- [Retrieve tasks](#retrieve-tasks)
	- [Update tasks](#update-tasks)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Activities

## Retrieve all activities of a course



	GET /activities/getcourseactivities/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Create activities



	POST /activities


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| createdAt			| 			|  <p>Activities's createdAt.</p>							|
| description			| 			|  <p>Activities's description.</p>							|
| createdBy_id			| 			|  <p>Activities's createdBy_id.</p>							|
| course_id			| 			|  <p>Activities's course_id.</p>							|

## Delete activities



	DELETE /activities/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve activities



	GET /activities


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update activities



	PUT /activities/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| createdAt			| 			|  <p>Activities's createdAt.</p>							|
| description			| 			|  <p>Activities's description.</p>							|
| createdBy_id			| 			|  <p>Activities's createdBy_id.</p>							|
| course_id			| 			|  <p>Activities's course_id.</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Chats

## Create chats



	POST /chats


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| course_id			| 			|  <p>Chats's course_id.</p>							|
| name			| 			|  <p>Chats's name.</p>							|

## Delete chats



	DELETE /chats/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve chats



	GET /chats


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update chats



	PUT /chats/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| course_id			| 			|  <p>Chats's course_id.</p>							|
| name			| 			|  <p>Chats's name.</p>							|

# Chatsusers

## Create chatsusers



	POST /chatsusers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| chat_id			| 			|  <p>Chatsusers's chat_id.</p>							|
| user_id			| 			|  <p>Chatsusers's user_id.</p>							|

## Delete chatsusers



	DELETE /chatsusers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve chatsusers



	GET /chatsusers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update chatsusers



	PUT /chatsusers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| chat_id			| 			|  <p>Chatsusers's chat_id.</p>							|
| user_id			| 			|  <p>Chatsusers's user_id.</p>							|

# Childrens

## Create childrens



	POST /childrens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| rut			| 			|  <p>Childrens's rut.</p>							|
| name			| 			|  <p>Childrens's name.</p>							|
| parent_id			| 			|  <p>Childrens's parent_id.</p>							|
| course_id			| 			|  <p>Childrens's course_id.</p>							|

## Delete childrens



	DELETE /childrens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve childrens



	GET /childrens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update childrens



	PUT /childrens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| rut			| 			|  <p>Childrens's rut.</p>							|
| name			| 			|  <p>Childrens's name.</p>							|
| parent_id			| 			|  <p>Childrens's parent_id.</p>							|
| course_id			| 			|  <p>Childrens's course_id.</p>							|

# Comments

## Create comments



	POST /comments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| content			| 			|  <p>Comments's content.</p>							|
| activity_id			| 			|  <p>Comments's activity_id.</p>							|
| createdBy_id			| 			|  <p>Comments's createdBy_id.</p>							|

## Delete comments



	DELETE /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve comments



	GET /comments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve comments of a activity



	GET /comments/getactivitycomments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Update comments



	PUT /comments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| content			| 			|  <p>Comments's content.</p>							|
| activity_id			| 			|  <p>Comments's activity_id.</p>							|
| createdBy_id			| 			|  <p>Comments's createdBy_id.</p>							|

# Courses

## Create courses



	POST /courses


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Courses's name.</p>							|
| garden_id			| 			|  <p>Courses's garden_id.</p>							|
| teacher_id			| 			|  <p>Courses's teacher_id.</p>							|

## Delete courses



	DELETE /courses/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve courses that a user has registered



	GET /courses/getcoursebyuser/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve courses



	GET /courses/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Update courses



	PUT /courses/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Courses's name.</p>							|
| garden_id			| 			|  <p>Courses's garden_id.</p>							|
| teacher_id			| 			|  <p>Courses's teacher_id.</p>							|

# Gardens

## Create gardens



	POST /gardens


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Gardens's name.</p>							|
| direction			| 			|  <p>Gardens's direction.</p>							|

## Delete gardens



	DELETE /gardens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve gardens



	GET /gardens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Update gardens



	PUT /gardens/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Gardens's name.</p>							|
| direction			| 			|  <p>Gardens's direction.</p>							|

# Likes

## Create likes



	POST /likes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| user_id			| 			|  <p>Likes's user_id.</p>							|
| activity_id			| 			|  <p>Likes's activity_id.</p>							|

## Delete likes



	DELETE /likes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve likes



	GET /likes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Update likes



	PUT /likes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| user_id			| 			|  <p>Likes's user_id.</p>							|
| activity_id			| 			|  <p>Likes's activity_id.</p>							|

# Messages

## Create messages



	POST /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| content			| 			|  <p>Messages's content.</p>							|
| sender_id			| 			|  <p>Messages's sender_id.</p>							|
| chat_id			| 			|  <p>Messages's chat_id.</p>							|

## Delete messages



	DELETE /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve messages



	GET /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update messages



	PUT /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| content			| 			|  <p>Messages's content.</p>							|
| sender_id			| 			|  <p>Messages's sender_id.</p>							|
| chat_id			| 			|  <p>Messages's chat_id.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Tasks

## Create tasks



	POST /tasks


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| name			| 			|  <p>Tasks's name.</p>							|
| description			| 			|  <p>Tasks's description.</p>							|
| selectedDate			| 			|  <p>Tasks's selectedDate.</p>							|
| timeof			| 			|  <p>Tasks's timeof.</p>							|
| course_id			| 			|  <p>Tasks's course_id.</p>							|

## Delete tasks



	DELETE /tasks/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve tasks



	GET /tasks


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update tasks



	PUT /tasks/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Tasks's name.</p>							|
| description			| 			|  <p>Tasks's description.</p>							|
| selectedDate			| 			|  <p>Tasks's selectedDate.</p>							|
| timeof			| 			|  <p>Tasks's timeof.</p>							|
| course_id			| 			|  <p>Tasks's course_id.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


