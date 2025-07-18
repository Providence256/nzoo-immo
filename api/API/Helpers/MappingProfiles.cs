using System;
using API.DTOs.BookingDto;
using API.DTOs.CancellationPolicyDto;
using API.DTOs.CommuneDto;
using API.DTOs.DeviseDto;
using API.DTOs.DiscountDto;
using API.DTOs.EquipementDto;
using API.DTOs.ListingDto;
using API.DTOs.RuleDto;
using API.DTOs.SousTypehebergementDto;
using API.DTOs.TauxChangeDto;
using API.DTOs.TypehebergementDto;
using API.DTOs.VilleDto;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Ville, VilleRequest>().ReverseMap();
        CreateMap<Commune, CommuneRequest>().ReverseMap();
        CreateMap<Commune, CommuneResponse>()
                            .ForMember(d => d.Ville, o => o.MapFrom(s => s.Ville.Designation))
                            .ReverseMap();
        CreateMap<Discount, DiscountRequest>().ReverseMap();
        CreateMap<Devise, DeviseRequest>().ReverseMap();
        CreateMap<Equipement, EquipementRequest>().ReverseMap();
        CreateMap<TypeHebergement, TypeHebergementRequest>().ReverseMap();
        CreateMap<CancellationPolicy, CancellationPolicyRequest>().ReverseMap();

        CreateMap<TypeHebergement, TypeHebergementResponse>()
            .ForMember(dest => dest.SousTypes, opt => opt.MapFrom(src => src.SousTypes))
            .ReverseMap();

        CreateMap<SousTypeHebergement, SousTypeRequest>().ReverseMap();

        CreateMap<SousTypeByHebergement, SousTypeResponse>()
                .ForMember(dest => dest.Designation, opt => opt.MapFrom(src => src.SousTypeHebergement != null ? src.SousTypeHebergement.Name : null))
                .ForMember(dest => dest.Icon, opt => opt.MapFrom(src => src.SousTypeHebergement != null ? src.SousTypeHebergement.Icon : null))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.SousTypeHebergement != null ? src.SousTypeHebergement.Description : null));

        CreateMap<Rule, RuleRequest>().ReverseMap();
        CreateMap<TauxChange, TauxChangeRequest>().ReverseMap();
        CreateMap<TauxChange, TauxChangeResponse>()
                              .ForMember(d => d.DeviseCode, o => o.MapFrom(s => s.Devise.Code))
                              .ReverseMap();

        //Listing 
        CreateMap<Listing, ListingResponse>()
           .ForMember(dest => dest.TypeHebergement, opt => opt.MapFrom(src => src.TypeHebergement!.Designation))
           .ForMember(dest => dest.Equipements, opt => opt.MapFrom(src => src.Equipements!.Select(e => e.Equipement)))
           .ForMember(dest => dest.Rules, opt => opt.MapFrom(src => src.Rules))
           .ForMember(dest => dest.PhotoUrls, opt => opt.MapFrom(src => src.Photos.Select(p => p.PhotoUrl)));

        // CreateMap<ListingPhoto, string>().ConvertUsing(p => p.PhotoUrl);
        CreateMap<ListingPrice, ListingPriceResponse>()
            .ForMember(dest => dest.CodeDevise, opt => opt.MapFrom(src => src.Devise!.Code));

        CreateMap<ListingLocation, ListingLocationResponse>()
            .ForMember(dest => dest.Ville, opt => opt.MapFrom(src => src.Ville!.Designation))
            .ForMember(dest => dest.Commune, opt => opt.MapFrom(src => src.Commune!.Designation));

        CreateMap<Equipement, EquipementResponse>()
            .ForMember(dest => dest.Nom, opt => opt.MapFrom(src => src.Designation))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
        CreateMap<ListingRule, RuleResponse>()
            .ForMember(dest => dest.Nom, opt => opt.MapFrom(src => src.Rule!.libelle));

        CreateMap<Booking, BookingResponse>()
            .ForMember(dest => dest.ListingTitle, opt => opt.MapFrom(src => src.Listing!.Title))
            .ForMember(dest => dest.Currency, opt => opt.MapFrom(s => s.Devise))
            .ForMember(dest => dest.ListingPhotoUrl, opt => opt.MapFrom(src => src.Listing!.Photos.FirstOrDefault()!.PhotoUrl))
            .ForMember(dest => dest.Adults, opt => opt.MapFrom(src => src.Guests.Adults))
            .ForMember(dest => dest.Children, opt => opt.MapFrom(src => src.Guests.Children))
            .ForMember(dest => dest.Babies, opt => opt.MapFrom(src => src.Guests.Babies))
            .ReverseMap();


    }
}
