﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TPCTrainco.Umbraco.Extensions.Models.Account;

namespace TPCTrainco.Umbraco.Extensions.Models.API.Request
{
    public class CreateUserRequestModel
    {
        public UserModel User { get; set; }
        public CompanyModel Company { get; set; }
    }
}
