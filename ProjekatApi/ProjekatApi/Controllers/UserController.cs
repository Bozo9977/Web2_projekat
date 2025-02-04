﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Amazon.AutoScaling.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjekatApi.FormModel;
using ProjekatApi.Model;

namespace ProjekatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly ApplicationSettings _appSettings;
        private readonly DatabaseContext context;
        private static int random;
        public UserController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> appSettings, DatabaseContext _context)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            context = _context;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> Register(UserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                City = model.City,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email                
                
            };

            if (model.Password == model.ConfirmPassword)
            {


                try
                {
                    var result = await _userManager.CreateAsync(applicationUser, model.Password);
                    if (result.Succeeded)
                    {
                        _userManager.AddToRoleAsync(applicationUser, "RegisteredUser").Wait();
                        random = SendActivationCode();
                        return Ok(result);
                    }
                    else
                    {
                        return BadRequest(new { message = "User already exist!." });
                    }

                }
                catch (Exception ex)
                {

                    throw ex;
                }

                
            }
            else
            {
                return BadRequest(new { message = "Password is incorrect." });
            }

            
        }

        public static int SendActivationCode()
        {
            Random random = new Random();
            int randNumber = random.Next(100001, 999999);
            string to = "bokimaric97@gmail.com";
            string from = "bokimaric97@gmail.com";
            MailMessage message = new MailMessage(from, to);
            message.Subject = "Aktivacioni kod";
            //message.Body = @"Using this new feature, you can send an email message from an application very easily.";
            message.Body = "Vas aktivacioni kod je: " + randNumber.ToString();
            try
            {
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                //smtpClient.UseDefaultCredentials = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(from, "Geografija9977");
                smtpClient.Send(message);
                //smtpClient.Send(message.From.ToString(), message.To.ToString(), message.Subject, message.Body);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Ex: " + ex);
            }
            return randNumber;
        }

        [HttpPost]
        [Route("ConfirmEmail")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> ConfirmEmail(UserModel model)
        {
            if (model.Code == random)
            {
                // User user = new User();
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    user.EmailConfirmed = true;
                    await _userManager.UpdateAsync(user);

                    try
                    {
                        await context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        return NotFound();
                    }
                }
            }


            return Ok();
        }

        [HttpPost]
        [Route("RegisterSistemAdmin")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> RegisterSistemAdmin(UserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                City = model.City,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
                EmailConfirmed = true
            };

            if (model.Password == model.ConfirmPassword)
            {


                try
                {
                    var result = await _userManager.CreateAsync(applicationUser, model.Password);
                    if (result.Succeeded)
                    {
                        _userManager.AddToRoleAsync(applicationUser, "Administrator").Wait();
                        return Ok(result);
                    }
                    else
                    {
                        return BadRequest(new { message = "User already exist!." });
                    }

                }
                catch (Exception ex)
                {

                    throw ex;
                }


            }
            else
            {
                return BadRequest(new { message = "Password is incorrect." });
            }

        }
        


        [HttpPost]
        [Route("RegisterAircompanyAdmin")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> RegisterAircompanyAdmin(UserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                City = model.City,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
                EmailConfirmed = true
            };

            if (model.Password == model.ConfirmPassword)
            {

                try
                {
                    var result = await _userManager.CreateAsync(applicationUser, model.Password);
                    if (result.Succeeded)
                    {
                        _userManager.AddToRoleAsync(applicationUser, "AirlineAdministrator").Wait();
                    }
                    return Ok(result);
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return Ok();
        }


        [HttpPost]
        [Route("RegisterCarcompanyAdmin")]
        public async Task<Object> RegisterCarcompanyAdmin(UserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                City = model.City,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
                EmailConfirmed = true
            };

            if (model.Password == model.ConfirmPassword)
            {
                try
                {
                    var result = await _userManager.CreateAsync(applicationUser, model.Password);
                    if (result.Succeeded)
                    {
                        _userManager.AddToRoleAsync(applicationUser, "CarAdministrator").Wait();
                    }
                    return Ok(result);
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            return Ok();
        }

        [HttpPut]
        [Route("UpdateCompanyService")]
        public async Task<Object> UpdateCompanyService(CompanyChange company)
        {

            //var carPom = await context.Cars.FindAsync(car.Id);

            Company comPom = await context.Companies.FindAsync(company.Id);

            comPom.Name = company.Name;
            comPom.Address = company.Address;
            comPom.Description = company.Description;

            context.Entry(comPom).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("ChangeUserInfo")]
        public async Task<IActionResult> ChangeUserInfo(UserModel user)
        {
            ApplicationUser appUser = await _userManager.FindByNameAsync(user.Email);
            appUser.City = user.City;
            appUser.FirstName = user.FirstName;
            appUser.LastName = user.LastName;
            appUser.PhoneNumber = user.PhoneNumber;
            

            try
            {
                await _userManager.UpdateAsync(appUser);
                
                var token = await _userManager.GeneratePasswordResetTokenAsync(appUser);

                var result = await _userManager.ResetPasswordAsync(appUser, token, user.Password);

                return Ok(result);
            }
            catch(Exception e)
            {
                return NoContent();
            }


            
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);

                if(roles.Count() > 0)
                {
                  
                    if(user.EmailConfirmed == true)
                    {
                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new Claim[]
                            {
                                new Claim("UserID",user.Id.ToString()),
                                new Claim("Roles", roles[0])
                            }),
                            Expires = DateTime.UtcNow.AddDays(1),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                        };
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                        var token = tokenHandler.WriteToken(securityToken);
                        return Ok(new { token });
                    }
                }
                return BadRequest(new { message = "Username or password is incorrect." });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetUserProfile")]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.City,
                user.PhoneNumber,
                user.Id
            };
        }



        [HttpPost]
        [Route("GetUsersSearhced")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsersSearhced(SearchFriend friendSearched)
        {
            List<ApplicationUser> result = new List<ApplicationUser>();
            //            result = _userManager.GetRolesAsync
            //_userManager.GetUsersInRoleAsync              

            var res = await _userManager.GetUsersInRoleAsync("RegisteredUser");
            result = res.ToList();

            if (!String.IsNullOrEmpty(friendSearched.FirstName) && !String.IsNullOrEmpty(friendSearched.LastName))
            {
                return result.Where(x => x.LastName.ToLower() == friendSearched.LastName.ToLower() && x.FirstName.ToLower() == friendSearched.FirstName.ToLower()).ToList();
            }
            else if(!String.IsNullOrEmpty(friendSearched.FirstName) && String.IsNullOrEmpty(friendSearched.LastName))
            {
                return result.Where(x => x.FirstName.ToLower() == friendSearched.FirstName.ToLower()).ToList();
            }
            else if(!String.IsNullOrEmpty(friendSearched.LastName) && String.IsNullOrEmpty(friendSearched.FirstName))
            {
                return result.Where(x => x.LastName.ToLower() == friendSearched.LastName.ToLower()).ToList();
            }
            else
            {
                return new List<ApplicationUser>();
            }
        }

        [HttpPost]
        [Route("AddFriend")]
        public async Task<IActionResult> AddFriend(FriendRequest friendRequest)
        {
            try
            {
                List<FriendRequest> reqs = context.FriendRequests.ToList();

                if (reqs.SingleOrDefault(x => (x.SenderID == friendRequest.SenderID && x.ReceiverID == friendRequest.ReceiverID) || (x.SenderID == friendRequest.ReceiverID && x.ReceiverID == friendRequest.SenderID)) != null)
                {
                    return BadRequest("This request already exists, check your requests.");
                }
                else
                {
                    context.FriendRequests.Add(friendRequest);
                    await context.SaveChangesAsync();
                    return Ok();
                }
                

            }catch(Exception e)
            {
                return NoContent();
            }
        }


        [HttpGet]
        [Route("RequestsForUser/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> RequestsForUser(string id)
        {
            List<FriendRequest> reqs =  context.FriendRequests.Where(x => x.ReceiverID == id && x.Accepted==false).ToList();

            List<ApplicationUser> retVal = new List<ApplicationUser>();

            foreach(var item in reqs)
            {
                retVal.Add(await _userManager.FindByIdAsync(item.SenderID));
            }

            return retVal;
        }

        [HttpGet]
        [Route("FriendsForUser/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> FriendsForUser(string id)
        {
            List<FriendRequest> reqs = context.FriendRequests.Where(x => (x.ReceiverID == id || x.SenderID==id) && x.Accepted == true).ToList();

            List<ApplicationUser> retVal = new List<ApplicationUser>();

            foreach (var item in reqs)
            {
                if (item.SenderID == id)
                    retVal.Add(await _userManager.FindByIdAsync(item.ReceiverID));
                else
                    retVal.Add(await _userManager.FindByIdAsync(item.SenderID));
            }

            return retVal;
        }

        [Route("AcceptFriend/{Id}")]
        public async Task<IActionResult> AcceptFriend(string Id)
        {
            try
            {
                string senderId = Id.Split('_')[0];
                string receiverId = Id.Split('_')[1];

                FriendRequest req = context.FriendRequests.SingleOrDefault(x => x.SenderID == senderId && x.ReceiverID == receiverId);

                req.Accepted = true;

                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return NoContent();
            }
            
        }
    }
}