﻿using Abp.Dependency;
using Abp.Domain.Repositories;
using IEManageSystem.CMS.DomainModel.ComponentDatas;
using IEManageSystem.CMS.DomainModel.Logics;
using IEManageSystem.CMS.DomainModel.PageDatas;
using IEManageSystem.CMS.DomainModel.Pages;
using IEManageSystem.Entitys.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace IEManageSystem.CommonInfrastructure.CMS
{
    public abstract class BaseActuator : IActuator
    {
        protected ContentComponentData CreateContentComponentData(string sign, PageData pageData) 
        {
            var componentDataRepository = IocManager.Instance.Resolve<IRepository<ContentComponentData>>();

            ContentComponentData contentComponentData = new ContentComponentData()
            {
                Sign = sign,
                PageData = pageData,
                SingleDatas = new List<ComponentSingleData>()
            };

            componentDataRepository.Insert(contentComponentData);

            return contentComponentData;
        }

        public abstract void Exec(ContentComponentData componentData, PageData pageData, Page page, User user, string request);
    }
}
