import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data types
  type InquiryId = Nat;

  type Plan = {
    #basic;
    #luxury;
    #highGraphic;
  };

  type Inquiry = {
    id : InquiryId;
    name : Text;
    email : Text;
    phone : Text;
    plan : Plan;
    websiteDescription : Text;
    businessType : Text;
    specialRequirements : Text;
    submittedAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  module Inquiry {
    public func compareById(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Nat.compare(inquiry1.id, inquiry2.id);
    };
  };

  // Persistent state
  let inquiries = Map.empty<InquiryId, Inquiry>();
  var nextInquiryId : InquiryId = 0;
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile functions

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Inquiry functions

  public shared ({ caller }) func submitInquiry(inquiry : Inquiry) : async {
    id : InquiryId;
    submittedAt : Time.Time;
  } {
    // No authorization check - anyone including guests can submit inquiries
    let id = nextInquiryId;
    let newInquiry : Inquiry = {
      inquiry with
      id;
      submittedAt = Time.now();
    };
    inquiries.add(id, newInquiry);
    nextInquiryId += 1;
    {
      id;
      submittedAt = newInquiry.submittedAt;
    };
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can get all inquiries");
    };
    inquiries.values().toArray().sort(Inquiry.compareById);
  };
};
