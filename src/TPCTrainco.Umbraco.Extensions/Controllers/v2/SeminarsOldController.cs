﻿using System;
using System.Web;
using System.Web.Http;
using TPCTrainco.Umbraco.Extensions.Models.SearchRequest;
using TPCTrainco.Umbraco.Extensions.Objects;
using TPCTrainco.Umbraco.Extensions.ViewModels.Angular;

namespace TPCTrainco.Umbraco.Extensions.Controllers.v2
{
    public class SeminarsOldController : ApiController
    {
        [HttpGet]
        public object Search(string id = null)
        {
            SearchResponse searchResponse = new SearchResponse();

            searchResponse.Success = true;
            searchResponse.ErrorMessage = "";

            try
            {

                int classId = 0;

                SeminarsSearchRequest2 searchRequest = new SeminarsSearchRequest2();

                searchRequest.DateRage = new DateRange();
                searchRequest.DateRage.Min = DateTime.Parse(DateTime.Now.ToString("M/1/yyyy"));
                searchRequest.DateRage.Max = DateTime.Parse(searchRequest.DateRage.Min.AddMonths(4).AddDays(-1).ToString("M/d/yyyy"));

                if (false == string.IsNullOrWhiteSpace(HttpContext.Current.Request.QueryString["keyword"]))
                {
                    searchRequest.Keywords = HttpContext.Current.Request.QueryString.Get("keyword");
                }
                if (false == string.IsNullOrWhiteSpace(HttpContext.Current.Request.QueryString["topic"]))
                {
                    searchRequest.Keywords = HttpContext.Current.Request.QueryString.Get("topic");
                }
                if (false == string.IsNullOrWhiteSpace(HttpContext.Current.Request.QueryString["location"]))
                {
                    searchRequest.Location = HttpContext.Current.Request.QueryString.Get("location");
                }
                if (false == string.IsNullOrWhiteSpace(HttpContext.Current.Request.QueryString["radius"]))
                {
                    double radius = 50;

                    double.TryParse(HttpContext.Current.Request.QueryString.Get("radius"), out radius);

                    searchRequest.Radius = radius;
                }
                if (false == string.IsNullOrWhiteSpace(HttpContext.Current.Request.QueryString["date-start"]))
                {
                    DateTime dateStart = searchRequest.DateRage.Min;
                    DateTime.TryParse(HttpContext.Current.Request.QueryString.Get("date-start"), out dateStart);

                    searchRequest.DateRage.Min = dateStart;
                }
                if (false == string.IsNullOrWhiteSpace(HttpContext.Current.Request.QueryString["date-end"]))
                {
                    DateTime dateEnd = searchRequest.DateRage.Max;
                    DateTime.TryParse(HttpContext.Current.Request.QueryString.Get("date-end"), out dateEnd);

                    searchRequest.DateRage.Max = dateEnd;
                }
                if (false == string.IsNullOrWhiteSpace(HttpContext.Current.Request.QueryString["page"]))
                {
                    int page = 0;

                    int.TryParse(HttpContext.Current.Request.QueryString.Get("page"), out page);

                    searchRequest.Page = page;
                }

                if (false == string.IsNullOrWhiteSpace(id))
                {
                    int.TryParse(id, out classId);

                    searchRequest.ClassId = classId;
                }

                Objects.SeminarDetails seminarsObj = new SeminarDetails();

                searchResponse.Seminars = seminarsObj.SearchSeminars(searchRequest);

            }
            catch (Exception ex)
            {
                searchResponse.Success = false;
                searchResponse.ErrorMessage = ex.ToString();
            }

            return searchResponse;
        }
    }
}
