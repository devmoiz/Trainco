﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace TPCTrainco.Umbraco.Extensions.Helpers
{
    public class StringUtilities
    {
        public static string LineBreaksToParagraphs(string text)
        {
            if (false == string.IsNullOrWhiteSpace(text))
            {
                List<string> breakArray = text.Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries).ToList();

                if (breakArray != null && breakArray.Count > 0)
                {
                    text = "";

                    foreach (string line in breakArray)
                    {
                        text += "<p>" + line + "</p>\n\r";
                    }
                }
            }

            return text;
        }


        public static string LineBreaksToEmailList(string text)
        {
            if (false == string.IsNullOrWhiteSpace(text))
            {
                List<string> breakArray = text.Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries).ToList();

                if (breakArray != null && breakArray.Count > 0)
                {
                    text = "";

                    foreach (string line in breakArray)
                    {
                        text += "<li><a href=\"mailto:" + line + "\">" + line + "</a></li>\n\r";
                    }
                }
            }

            return text;
        }


        public static string StripPTags(string text)
        {
            if (false == string.IsNullOrWhiteSpace(text))
            {
                text = text.Replace("<p>", "");
                text = text.Replace("</p>", "");
            }

            return text;
        }


        public static List<string> SplitPhoneNumber(string phone)
        {
            List<string> phoneArray = null;

            if (false == string.IsNullOrWhiteSpace(phone))
            {
                string phoneTemp = Regex.Replace(phone, @"[\(\)\- ]", "");

                if (phoneTemp.Length == 11 && phoneTemp.Substring(0,1) == "1")
                {
                    phoneTemp = phoneTemp.Substring(1, 10);
                }

                if (phoneTemp.Length == 10)
                {
                    phoneArray = new List<string>();

                    phoneArray.Add(phoneTemp.Substring(0, 3));
                    phoneArray.Add(phoneTemp.Substring(3, 3));
                    phoneArray.Add(phoneTemp.Substring(6, 4));
                }
            }

            return phoneArray;
        }


        public static string FormatPhoneNumber(string phone)
        {
            string formattedPhone = phone;

            if (false == string.IsNullOrWhiteSpace(formattedPhone))
            {
                string phoneTemp = Regex.Replace(phone, @"[\(\)\- ]", "");

                if (phoneTemp.Length == 10)
                {
                    formattedPhone = "(" + phoneTemp.Substring(0, 3) + ") ";
                    formattedPhone += phoneTemp.Substring(3, 3) + "-" + phoneTemp.Substring(6, 4);
                }
            }

            return formattedPhone;
        }


        public static string CreditCardType(string creditCard)
        {
            string ccType = "Unknown";

            if (false == string.IsNullOrWhiteSpace(creditCard) && creditCard.Length > 2)
            {
                if (creditCard.Substring(0, 1) == "4")
                {
                    ccType = "Visa";
                }
                else if (Convert.ToInt16(creditCard.Substring(0, 2)) >= 51 && Convert.ToInt16(creditCard.Substring(0, 2)) <= 55)
                {
                    ccType = "Mastercard";
                }
                else if (creditCard.Substring(0, 2) == "34" || creditCard.Substring(0, 2) == "37")
                {
                    ccType = "American Express";
                }
                else if (creditCard.Substring(0, 2) == "60" || creditCard.Substring(0, 2) == "65")
                {
                    ccType = "Discover";
                }
            }


            return ccType;
        }



        public static string GetLast(string source, int length)
        {
            if (length >= source.Length)
            {
                return source;
            }
            else
            {
                return source.Substring(source.Length - length);
            }
        }


        public static string StringMaxLength(string text, int length)
        {
            if (false == string.IsNullOrEmpty(text))
            {
                if (text.Length > length)
                {
                    text = text.Substring(0, length);
                }
            }

            return text;
        }


        public static DateTime GetExpirationDate(string expiration)
        {
            DateTime dtExpire = DateTime.MinValue;

            try
            {
                if (false == string.IsNullOrWhiteSpace(expiration))
                {
                    List<string> dateArray = expiration.Split('/').ToList();

                    if (dateArray.Count == 2)
                    {
                        short month = Convert.ToInt16(dateArray[0]);

                        short year = 2000;

                        if (dateArray[1].Length == 2)
                        {
                            year = Convert.ToInt16("20" + dateArray[1]);
                        }
                        else if (dateArray[1].Length == 3)
                        {
                            year = Convert.ToInt16("2" + dateArray[1]);
                        }
                        else if (dateArray[1].Length == 4)
                        {
                            year = Convert.ToInt16(dateArray[1]);
                        }

                        dtExpire = DateTime.Parse(month + "/" + year);
                    }
                }
            }
            catch { }

            return dtExpire;
        }
    }
}
