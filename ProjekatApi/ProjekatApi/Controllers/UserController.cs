using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        public UserController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
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
                    }

                    return Ok(result);


                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }

            return BadRequest(new { message = "Password is incorrect." });
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
                Email = model.Email

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
                Email = model.Email

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
                user.PhoneNumber
            };
        }
    }
}